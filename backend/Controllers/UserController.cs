using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using backend.Models.Dtos;
using System.Text.Json;
using System.Net.Http;
using System.Security.Claims;
using Microsoft.Extensions.Caching.Memory;

namespace backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        public UserController(IConfiguration config, HttpClient httpClient, IMemoryCache cache)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _httpClient = httpClient;
            _cache = cache;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUserRequest user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Role))
                return BadRequest("Username and Role are required");
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    using (var cmd = new SqlCommand("AddUser", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Username", user.Username);
                        cmd.Parameters.AddWithValue("@Password", user.Password); // Password passed as string
                        cmd.Parameters.AddWithValue("@Role", user.Role);

                        cmd.ExecuteNonQuery();
                    }
                }
                return Ok(new { success = true, message = "User registered successfully" });
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2627) // Unique constraint violation error number
                {
                    return Conflict(new { success = false, error = "Username already exists." });
                }
                return StatusCode(500, new { success = false, error = "Internal server error." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = "Something went wrong." });
            }
        }


        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            List<UserModel> users = new List<UserModel>();

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("SELECT Id, Username, Role, CreatedAt FROM Users", conn))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new UserModel
                            {
                                Id = reader.GetInt32(0),
                                Username = reader.GetString(1),
                                Role = reader.GetString(2),
                                CreatedAt = reader.GetDateTime(3)
                            });
                        }
                    }
                }
            }
            return Ok(users);
        }


        [HttpGet("portfolio-summary")]
        public async Task<IActionResult> GetPortfolioSummary([FromHeader(Name = "X-Session-ID")] string sessionId)
        {
            // get userid from session stored in cache
            if (!_cache.TryGetValue(sessionId, out int userId))
            {
                return Unauthorized("Invalid or expired session.");
            }

            decimal totalPortfolioValue = 0;
            decimal totalPortfolioValueYesterday = 0;
            int totalAssets = 0;
            string bestPerformer = "";
            decimal bestPerformance = -99;

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("GetUserAllHoldings", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        var holdings = new List<(string CryptoSymbol, decimal Quantity, decimal AvgBuyPrice)>();

                        while (reader.Read())
                        {
                            holdings.Add((reader.GetString(0), reader.GetDecimal(1), reader.GetDecimal(2)));
                        }

                        // get total number of assets holding
                        totalAssets = holdings.Count;

                        using (var httpClient = new HttpClient())
                        {
                            foreach (var holding in holdings)
                            {
                                string symbol = holding.CryptoSymbol.ToUpper() + "USDT";

                                // **1. Fetch Current Price**
                                string priceUrl = $"https://api.binance.com/api/v3/ticker/price?symbol={symbol}";
                                var priceResponse = await httpClient.GetStringAsync(priceUrl);
                                var priceData = JsonSerializer.Deserialize<Dictionary<string, string>>(priceResponse);
                                decimal currentPrice = decimal.Parse(priceData["price"]);

                                // **2. Fetch 24h Old Price Using Binance Kline API**
                                string klineUrl = $"https://api.binance.com/api/v3/klines?symbol={symbol}&interval=1d&limit=2";
                                var klineResponse = await httpClient.GetStringAsync(klineUrl);
                                var klineData = JsonSerializer.Deserialize<List<List<object>>>(klineResponse);
                                decimal priceYesterday = decimal.Parse(klineData[0][4].ToString()); // Closing price 24h ago

                                // **3. Compute Values**
                                decimal marketValue = holding.Quantity * currentPrice;
                                totalPortfolioValue += marketValue;

                                decimal yesterdayMarketValue = holding.Quantity * priceYesterday;
                                totalPortfolioValueYesterday += yesterdayMarketValue;

                                decimal priceChange = ((currentPrice - priceYesterday) / priceYesterday) * 100;
                                if (priceChange > bestPerformance)
                                {
                                    bestPerformance = priceChange;
                                    bestPerformer = holding.CryptoSymbol;
                                }
                            }
                        }
                    }
                }
            }

            decimal change24h = totalPortfolioValue - totalPortfolioValueYesterday;
            decimal change24hPercent = totalPortfolioValueYesterday > 0 ? (change24h / totalPortfolioValueYesterday) * 100 : 0;

            return Ok(new
            {
                TotalPortfolioValue = totalPortfolioValue,
                Change24h = change24h,
                Change24hPercent = change24hPercent,
                TotalAssets = totalAssets,
                BestPerformer = bestPerformer,
                BestPerformance = bestPerformance
            });
        }


        [HttpGet("asset-distribution")]
        public async Task<IActionResult> GetAssetDistribution([FromHeader(Name = "X-Session-ID")] string sessionId)
        {
            //int? userId = HttpContext.Session.GetInt32("UserId");
            //int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            //if (userId == 0)
            //    return Unauthorized("User not logged in");
            if (!_cache.TryGetValue(sessionId, out int userId))
            {
                return Unauthorized("Invalid or expired session.");
            }

            var holdings = new List<(string Symbol, decimal Quantity)>();
            decimal totalPortfolioValue = 0;
            var assetDistribution = new List<AssetDistributionDto>();

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("SELECT CryptoSymbol, TotalQuantity FROM UserHoldings WHERE UserId = @UserId", conn))
                {
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            holdings.Add((reader.GetString(0), reader.GetDecimal(1)));
                        }
                    }
                }
            }

            if (holdings.Count == 0)
                return Ok(assetDistribution);

            foreach (var holding in holdings)
            {
                string symbol = holding.Symbol.ToUpper() + "USDT";
                string priceUrl = $"https://api.binance.com/api/v3/ticker/price?symbol={symbol}";

                try
                {
                    var priceResponse = await _httpClient.GetStringAsync(priceUrl);
                    var priceData = JsonSerializer.Deserialize<Dictionary<string, string>>(priceResponse);
                    decimal currentPrice = decimal.Parse(priceData["price"]);

                    decimal marketValue = holding.Quantity * currentPrice;
                    totalPortfolioValue += marketValue;
                    assetDistribution.Add(new AssetDistributionDto
                    {
                        Symbol = holding.Symbol,
                        Value = marketValue
                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to fetch price for {symbol}: {ex.Message}");
                }
            }

            if (totalPortfolioValue > 0)
            {
                assetDistribution = assetDistribution
                    .Select(asset => new AssetDistributionDto
                    {
                        Symbol = asset.Symbol,
                        Percentage = (asset.Value / totalPortfolioValue) * 100
                    })
                    .ToList();
            }

            return Ok(new
            {
                AssetDistribution = assetDistribution
            });
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetUserTransactions([FromHeader(Name = "X-Session-ID")] string sessionId)
        {
            //int userId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            //if (userId == 0)
            //    return Unauthorized("User not logged in");
            if (!_cache.TryGetValue(sessionId, out int userId))
            {
                return Unauthorized("Invalid or expired session.");
            }

            using (var conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                using (var cmd = new SqlCommand("GetUserTransactions", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    var transactions = new List<object>();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            transactions.Add(new
                            {
                                Id = reader.GetInt32(0),
                                Asset = reader.GetString(1),
                                Type = reader.GetString(2),
                                Amount = reader.GetString(3),
                                Value = reader.GetString(4),
                                Date = reader.GetDateTime(5).ToString("yyyy-MM-dd HH:mm")
                            });
                        }
                    }

                    return Ok(transactions);
                }
            }
        }

    }
}
