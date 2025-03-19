namespace backend.Models.Dtos
{
    public class TransactionRequest
    {
        public string CryptoSymbol { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public string TransactionType { get; set; } = string.Empty; // "BUY" or "SELL"
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
    }
}
