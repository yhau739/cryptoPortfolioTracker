using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dtos
{
    public class AddTransactionDto
    {
        [Required]
        public string Crypto { get; set; }
        public decimal Quantity { get; set; }
        public bool UseCurrentPrice { get; set; }
        public decimal? Price { get; set; }

        [Required]
        [RegularExpression("buy|sell")]
        public string TransactionType { get; set; } // "buy" or "sell"
    }
}
