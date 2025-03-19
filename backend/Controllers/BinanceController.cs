using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

[ApiController]
[Route("api/[controller]")]
public class BinanceController : ControllerBase
{
    private static readonly HttpClient httpClient = new HttpClient();

    [HttpGet("usdt-pairs")]
    public async Task<IActionResult> GetUsdtPairs()
    {
        // Binance API endpoint for exchange information
        string apiUrl = "https://api.binance.com/api/v3/exchangeInfo";

        try
        {
            // Send a GET request to the Binance API
            HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();

            // Read the response content as a string
            string content = await response.Content.ReadAsStringAsync();

            // Parse the JSON response
            JObject json = JObject.Parse(content);

            // Extract the list of symbols
            JArray symbols = (JArray)json["symbols"];

            // Filter symbols ending with 'USDT' and select the base asset
            List<string> usdtPairs = symbols
                .Where(s => (string)s["quoteAsset"] == "USDT" && (string)s["status"] == "TRADING")
                .Select(s => (string)s["baseAsset"])
                .Distinct()
                .ToList();

            // Return the list of base assets as a JSON response
            return Ok(usdtPairs);
        }
        catch (HttpRequestException ex)
        {
            // Handle potential HTTP request errors
            return StatusCode(500, $"Error retrieving data from Binance API: {ex.Message}");
        }
    }

    [HttpGet("btc-price-history")]
    public async Task<IActionResult> GetBtcPriceHistory()
    {
        string symbol = "BTCUSDT";
        int days = 7;
        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        long oneDayMs = 24 * 60 * 60 * 1000;
        long startTime = now - (days * oneDayMs);

        string apiUrl = $"https://api.binance.com/api/v3/klines?symbol={symbol}&interval=1d&startTime={startTime}&limit={days}";

        try
        {
            HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
            response.EnsureSuccessStatusCode();
            string content = await response.Content.ReadAsStringAsync();

            JArray json = JArray.Parse(content);

            var prices = new List<object>();

            foreach (var item in json)
            {
                long timestamp = (long)item[0];
                decimal closingPrice = (decimal)item[4];

                prices.Add(new
                {
                    date = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).UtcDateTime.ToString("yyyy-MM-dd"),
                    price = closingPrice
                });
            }

            return Ok(prices);
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Error retrieving data from Binance API: {ex.Message}");
        }
    }
}
