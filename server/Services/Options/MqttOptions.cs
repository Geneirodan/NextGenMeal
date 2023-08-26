namespace Services.Options;

public class MqttOptions
{
    public const string Section = "Mqtt";
    public string Prefix { get; init; } = null!;
    public string Broker { get; init; } = null!;
    public int Port { get; init; }
}
