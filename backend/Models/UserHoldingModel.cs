namespace backend.Models
{
    public class UserHoldingModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CryptoSymbol { get; set; } = string.Empty;
        public decimal TotalQuantity { get; set; }
        public decimal AverageBuyPrice { get; set; }
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}
