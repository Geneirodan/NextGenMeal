namespace API.Requests
{
    public class OptimalOrderRequest
    {
        public int MaxPrice { get; set; }
        public Dictionary<string, int> Types { get; set; }
    }
}
