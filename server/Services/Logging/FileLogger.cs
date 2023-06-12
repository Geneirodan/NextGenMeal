using Microsoft.Extensions.Logging;

namespace Services.Logging
{
    public class FileLogger : ILogger, IDisposable
    {
        readonly string filePath;
        static readonly object @lock = new();

        public FileLogger(string path) => filePath = path;

        public IDisposable BeginScope<TState>(TState state) where TState : notnull => this;

        public void Dispose() => GC.SuppressFinalize(this);

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel,
                                EventId eventId,
                                TState state,
                                Exception? exception,
                                Func<TState, Exception?, string> formatter)
        {
            lock (@lock)
                File.AppendAllText(filePath, $"[{DateTime.UtcNow}] {formatter(state, exception)}{Environment.NewLine}");
        }
    }
}
