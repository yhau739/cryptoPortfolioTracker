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

namespace backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public AuthController(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
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
                                    // Store user data in session
                                    //HttpContext.Session.SetInt32("UserId", userId);
                                    //HttpContext.Session.SetString("Username", username);
                                    //HttpContext.Session.SetString("Role", role);

                                    // 🔹 Create authentication claims
                                    var claims = new List<Claim>
                                    {
                                        new Claim(ClaimTypes.NameIdentifier, userId.ToString()), // Store user ID in claims
                                        new Claim(ClaimTypes.NameIdentifier, username)
                                    };

                                    var claimsIdentity = new ClaimsIdentity(claims, "SessionAuth");
                                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                                    // Sign in the user and issue an authentication cookie
                                    await HttpContext.SignInAsync("SessionAuth", claimsPrincipal);

                                    // Double-check that authentication is now valid
                                    bool isAuthenticated = HttpContext.User.Identity.IsAuthenticated;
                                    Console.WriteLine($"🔍 Authentication Status After SignInAsync: {isAuthenticated}");

                                    return Ok(new { success = true, message = "Login successful" });
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
            await HttpContext.SignOutAsync("SessionAuth"); // ✅ Remove authentication cookie
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
