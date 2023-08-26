namespace Services.Options;

public class PaginationOptions
{
    public const string Section = "Pagination";
    public int ItemsPerPage { get; init; } = 10;
}
