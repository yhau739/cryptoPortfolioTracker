using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/pnl")]
    [ApiController]
    public class PnlController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public PnlController(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
        }

        //[HttpGet("pnl/{cryptoSymbol}")]
        //public async Task<IActionResult> GetRealTimePNLAsync(string cryptoSymbol)
        //{
        //    int? userId = HttpContext.Session.GetInt32("UserId");
        //    if (userId == null)
        //        return Unauthorized("User not logged in");


        //    decimal currentPrice;
        //    try
        //    {
        //        using (var httpClient = new HttpClient())
        //        {
        //            string symbol = cryptoSymbol.ToUpper() + "USDT"; // Assuming USDT trading pair
        //            string url = $"https://api.binance.com/api/v3/ticker/price?symbol={symbol}";

        //            var response = await httpClient.GetStringAsync(url);
        //            var priceData = JsonSerializer.Deserialize<Dictionary<string, string>>(response);
        //            currentPrice = decimal.Parse(priceData["price"]);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { error = "Failed to fetch price from Binance", details = ex.Message });
        //    }


        //    using (var conn = new SqlConnection(_connectionString))
        //    {
        //        conn.Open();
        //        using (var cmd = new SqlCommand("SELECT TotalQuantity, AverageBuyPrice FROM UserHoldings WHERE UserId = @UserId AND CryptoSymbol = @CryptoSymbol", conn))
        //        {
        //            cmd.Parameters.AddWithValue("@UserId", userId);
        //            cmd.Parameters.AddWithValue("@CryptoSymbol", cryptoSymbol);

        //            using (var reader = cmd.ExecuteReader())
        //            {
        //                if (!reader.Read())
        //                    return Ok(new { PNL = 0, MarketValue = 0, TotalCost = 0 }); // No holdings, PNL = 0

        //                decimal totalQuantity = reader.GetDecimal(0);
        //                decimal averageBuyPrice = reader.GetDecimal(1);
        //                decimal totalCost = totalQuantity * averageBuyPrice;
        //                decimal marketValue = totalQuantity * currentPrice;
        //                decimal pnl = marketValue - totalCost;

        //                return Ok(new { PNL = pnl, MarketValue = marketValue, TotalCost = totalCost });
        //            }
        //        }
        //    }
        //}
        [HttpGet("realized-pnl")]
        public IActionResult GetRealizedPNL()
        {
            int? userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
                return Unauthorized("User not logged in");

            List<object> realizedPnlList = new List<object>();

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("GetRealizedPNL", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            realizedPnlList.Add(new
                            {
                                TransactionDate = reader.GetDateTime(0),
                                CryptoSymbol = reader.GetString(1),
                                SoldQuantity = reader.GetDecimal(2),
                                SellPrice = reader.GetDecimal(3),
                                TotalCost = reader.GetDecimal(4),
                                TotalRevenue = reader.GetDecimal(5),
                                RealizedPNL = reader.GetDecimal(6)
                            });
                        }
                    }
                }
            }
            return Ok(realizedPnlList);
        }


        [HttpGet("{cryptoSymbol}")]
        public async Task<IActionResult> GetRealTimePNLAsync(string cryptoSymbol)
        {
            int? userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
                return Unauthorized("User not logged in");

            decimal currentPrice;
            try
            {
                using (var httpClient = new HttpClient())
                {
                    string symbol = cryptoSymbol.ToUpper() + "USDT"; // Assuming USDT trading pair
                    string url = $"https://api.binance.com/api/v3/ticker/price?symbol={symbol}";

                    var response = await httpClient.GetStringAsync(url);
                    var priceData = JsonSerializer.Deserialize<Dictionary<string, string>>(response);
                    currentPrice = decimal.Parse(priceData["price"]);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Failed to fetch price from Binance", details = ex.Message });
            }

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("GetUserHoldings", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    cmd.Parameters.AddWithValue("@CryptoSymbol", cryptoSymbol);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (!reader.Read())
                            return Ok(new { PNL = 0, MarketValue = 0, TotalCost = 0 }); // No holdings, PNL = 0

                        decimal totalQuantity = reader.GetDecimal(0);
                        decimal averageBuyPrice = reader.GetDecimal(1);
                        decimal totalCost = totalQuantity * averageBuyPrice;
                        decimal marketValue = totalQuantity * currentPrice;
                        decimal pnl = marketValue - totalCost;

                        return Ok(new { PNL = pnl, MarketValue = marketValue, TotalCost = totalCost, CurrentPrice = currentPrice });
                    }
                }
            }
        }

    }
}
