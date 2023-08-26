using Microsoft.Extensions.Logging;

namespace Services.Logging;

public class FileLoggerProvider : ILoggerProvider
{
    private readonly string path;
    public FileLoggerProvider(string path) => this.path = path;
    public ILogger CreateLogger(string categoryName) => new FileLogger(path);
    public void Dispose() => GC.SuppressFinalize(this);
}
