using Microsoft.Extensions.Logging;

namespace Services.Logging;

public class FileLogger : ILogger, IDisposable
{
    private static readonly object _lock = new();
    private readonly string filePath;

    public FileLogger(string path) => filePath = path;

    public void Dispose() => GC.SuppressFinalize(this);

    public IDisposable BeginScope<TState>(TState state) where TState : notnull => this;

    public bool IsEnabled(LogLevel logLevel) => true;

    public void Log<TState>(LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        lock (_lock)
            File.AppendAllText(filePath, $"[{DateTime.UtcNow}] {formatter(state, exception)}{Environment.NewLine}");
    }
}
