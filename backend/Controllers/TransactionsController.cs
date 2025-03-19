//using Microsoft.AspNetCore.Authorization;
////using Microsoft.AspNetCore.Mvc;
////using System.Data.SqlClient;
////using System.Data;

////namespace backend.Controllers
////{
////    public class TransactionsController
////    {
////    }
////}
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using System.Data.SqlClient;
//using System.Data;
//using System.Transactions;
//using backend.Models;

//[Route("api/transactions")]
//[ApiController]
//[Authorize]
//public class TransactionsController : ControllerBase
//{
//    private readonly string _connectionString;

//    public TransactionsController(IConfiguration config)
//    {
//        _connectionString = config.GetConnectionString("DefaultConnection");
//    }

//    [HttpPost("add")]
//    public IActionResult AddTransaction([FromBody] TransactionModel transaction)
//    {
//        using (var conn = new SqlConnection(_connectionString))
//        {
//            conn.Open();
//            using (var cmd = new SqlCommand("AddTransaction", conn))
//            {
//                cmd.CommandType = CommandType.StoredProcedure;
//                cmd.Parameters.AddWithValue("@UserId", transaction.UserId);
//                cmd.Parameters.AddWithValue("@CryptoSymbol", transaction.CryptoSymbol);
//                cmd.Parameters.AddWithValue("@Quantity", transaction.Quantity);
//                cmd.Parameters.AddWithValue("@Price", transaction.Price);
//                cmd.Parameters.AddWithValue("@TransactionType", transaction.TransactionType);

//                try
//                {
//                    cmd.ExecuteNonQuery();
//                    return Ok("Transaction added successfully");
//                }
//                catch (SqlException ex)
//                {
//                    return BadRequest(ex.Message);
//                }
//            }
//        }
//    }
//}
using backend.Models;
using backend.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace backend.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public TransactionsController(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
        }

        [HttpPost("add")]
        public IActionResult AddTransaction([FromBody] TransactionRequest transaction)
        {
            // Get UserId from session
            int? userId = HttpContext.Session.GetInt32("UserId");

            if (userId == null)
                return Unauthorized("User not logged in");

            // Validate transaction type (must be "BUY" or "SELL")
            string[] validTypes = { "BUY", "SELL" };
            if (!validTypes.Contains(transaction.TransactionType.ToUpper()))
            {
                return BadRequest("Invalid TransactionType. Only 'BUY' or 'SELL' are allowed.");
            }

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("AddTransaction", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId); // Automatically get UserId from session
                    cmd.Parameters.AddWithValue("@CryptoSymbol", transaction.CryptoSymbol);
                    cmd.Parameters.AddWithValue("@Quantity", transaction.Quantity);
                    cmd.Parameters.AddWithValue("@Price", transaction.Price);
                    cmd.Parameters.AddWithValue("@TransactionType", transaction.TransactionType);

                    cmd.ExecuteNonQuery();
                }
            }
            return Ok("Transaction added successfully");
        }

    }
}
