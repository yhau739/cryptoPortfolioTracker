using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using backend.Models.Dtos;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.Extensions.Caching.Memory;

namespace backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private readonly IMemoryCache _cache;

        public AuthController(IMemoryCache cache, IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _cache = cache;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {

            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand("SELECT Id, Username, PasswordHash, PasswordSalt, Role FROM Users WHERE Username = @Username", conn))
                {
                    cmd.Parameters.AddWithValue("@Username", request.Username);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int userId = reader.GetInt32(0);
                            string username = reader.GetString(1);
                            byte[] storedPasswordHash = (byte[])reader["PasswordHash"];
                            byte[] storedPasswordSalt = (byte[])reader["PasswordSalt"];
                            string role = reader.GetString(4);

                            using (SHA512 sha512 = SHA512.Create())
                            {
                                byte[] computedHash = ComputeSha512Hash(request.Password, storedPasswordSalt);

                                if (computedHash.SequenceEqual(storedPasswordHash))
                                {
                                    // generate session store in cache
                                    string sessionId = Guid.NewGuid().ToString(); // Generate a session key
                                    _cache.Set(sessionId, userId, TimeSpan.FromHours(1)); // Store UserId in cache

                                    return Ok(new { success = true, message = "Login successful", sessionId = sessionId });
                                }
                            }

                        }
                    }
                }
            }
            return Conflict(new { success = false, error = "Invalid Username or Password." });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            //HttpContext.Session.Clear(); // Remove session data
            await HttpContext.SignOutAsync("SessionAuth"); // Remove authentication cookie
            HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity());
            return Ok(new { Message = "Logged out successfully" });
        }

        [HttpGet("current-user")]
        public IActionResult GetCurrentUser()
        {
            int userId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            if (userId != 0)
            {
                return Ok(new
                {
                    UserId = userId,
                });
            }
            return Unauthorized("No active session found");
        }

        [HttpGet("debug-session")]
        public IActionResult DebugSession()
        {
            //var userId = HttpContext.Session.GetInt32("UserId");
            //var username = HttpContext.Session.GetString("Username");

            //Console.WriteLine($"Session Debug: UserId={userId}, Username={username}");

            return Ok(new
            {
                //    UserId = userId,
                //    Username = username,
                Cookies = Request.Cookies
            });
        }


        private byte[] ComputeSha512Hash(string password, byte[] salt)
        {
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] passwordBytes = Encoding.Unicode.GetBytes(password); // ✅ Use UTF-16 to match SQL Server
                byte[] combinedBytes = passwordBytes.Concat(salt).ToArray();
                return sha512.ComputeHash(combinedBytes);
            }
        }

    }
}
