namespace backend.Models
{
    public class TransactionModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CryptoSymbol { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public string TransactionType { get; set; } = string.Empty; // "BUY" or "SELL"
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
    }
}
