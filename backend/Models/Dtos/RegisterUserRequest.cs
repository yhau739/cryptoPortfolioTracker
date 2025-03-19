using System.ComponentModel;

namespace backend.Models.Dtos
{
    public class RegisterUserRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }

        [DefaultValue("User")]
        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
