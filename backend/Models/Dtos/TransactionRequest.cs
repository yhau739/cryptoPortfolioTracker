﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dtos
{
    public class TransactionRequest
    {
        [Required]
        public string Crypto { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public bool UseCurrentPrice { get; set; }
        public decimal? Price { get; set; }
        public string TransactionType { get; set; } = string.Empty; // "BUY" or "SELL"
    }
}
