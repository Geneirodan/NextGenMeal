using MQTTnet;
using MQTTnet.Client;

namespace API.Extensions
{
    public static class Services
    {
        public static IServiceCollection AddMqttClient(this IServiceCollection services, string clientId, string server)
        {
            var options = new MqttClientOptionsBuilder()
                .WithClientId(clientId)
                .WithTcpServer(server)
                .Build();
            var factory = new MqttFactory();
            IMqttClient client = factory.CreateMqttClient();
            _ = Task.Run(async () =>
            {
                while (true)
                {
                    try
                    {
                        if (!await client.TryPingAsync())
                        {
                            await client.ConnectAsync(options);
                            Console.WriteLine("The MQTT client is connected.");
                        }
                    }
                    catch
                    {
                        Console.WriteLine("The MQTT client can't connect.");
                    }
                    finally
                    {
                        await Task.Delay(TimeSpan.FromSeconds(5));
                    }
                }
            });
            services.AddSingleton(client);
            return services;
        }
    }
}
