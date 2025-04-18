using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;


// Keep Alive Ping to make sure free tier azure app service is always warm
[ApiController]
[Route("api/[controller]")]
public class PingController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly String _connectionString;

    public PingController(IConfiguration config)
    {
        _config = config;
        _connectionString = _config.GetConnectionString("DefaultConnection");
    }

    // using uptimerobot to HTTP Get every 5 minutes
    [HttpHead("get")]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Simple lightweight query
                using (var command = new SqlCommand("SELECT 1", connection))
                {
                    await command.ExecuteScalarAsync();
                }
            }

            return Ok("pong + db ok");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"ping error: {ex.Message}");
        }
    }
}
