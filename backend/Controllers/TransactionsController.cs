using backend.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private readonly IMemoryCache _cache;

        public TransactionsController(IConfiguration config, IMemoryCache cache)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _cache = cache;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTransactionAsync([FromHeader(Name = "X-Session-ID")] string sessionId, [FromBody] TransactionRequest transaction)
        {
            // get userid from session stored in cache
            if (!_cache.TryGetValue(sessionId, out int userId))
            {
                return Unauthorized("Invalid or expired session.");
            }

            //// Get UserId from session
            //int? userId = HttpContext.Session.GetInt32("UserId");

            //if (userId == null)
            //    return Unauthorized("User not logged in");

            // Validate transaction type (must be "BUY" or "SELL")
            string[] validTypes = { "BUY", "SELL" };

            // convert to UPPER case
            transaction.TransactionType = transaction.TransactionType.ToUpper();

            if (!validTypes.Contains(transaction.TransactionType))
            {
                return BadRequest("Invalid TransactionType. Only 'BUY' or 'SELL' are allowed.");
            }

            // Fetch current price if UseCurrentPrice is true
            if (transaction.UseCurrentPrice)
            {
                string symbol = transaction.Crypto.ToUpper() + "USDT";
                try
                {
                    using (var httpClient = new HttpClient())
                    {
                        string priceUrl = $"https://api.binance.com/api/v3/ticker/price?symbol={symbol}";
                        var priceResponse = await httpClient.GetStringAsync(priceUrl);
                        var priceData = JsonSerializer.Deserialize<Dictionary<string, string>>(priceResponse);

                        if (priceData == null || !priceData.ContainsKey("price"))
                            return BadRequest(new { success = false, message = "Unable to parse from Binance API" });

                        transaction.Price = decimal.Parse(priceData["price"]);
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new {success = false, message = $"Error: {ex}"});
                }
            }

            // call stored procedure
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("AddTransaction", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId); // Automatically get UserId from session
                    cmd.Parameters.AddWithValue("@CryptoSymbol", transaction.Crypto);
                    cmd.Parameters.AddWithValue("@Quantity", transaction.Quantity);
                    cmd.Parameters.AddWithValue("@Price", transaction.Price);
                    cmd.Parameters.AddWithValue("@TransactionType", transaction.TransactionType);

                    cmd.ExecuteNonQuery();
                }
            }

            return Ok(new { success = true, message = "Transaction added successfully" });
        }

    }
}
