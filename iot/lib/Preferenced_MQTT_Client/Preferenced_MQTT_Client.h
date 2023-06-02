#include <Preferences.h>
#include <MQTTPubSubClient.h>
#include <WiFi.h>

#define SERIAL_NUMBER 123

class Preferenced_MQTT_Client
{
private:
    WiFiClient client;
    Preferences* preferences;
    MQTTPubSubClient mqtt;
    char broker[50], prefix[50];
    unsigned short port;

public:
    Preferenced_MQTT_Client(Preferences* preferences);
    char *getBroker() { return broker; }
    int getPort() { return port; }
    char *getPrefix() { return prefix; }
    void setBroker(const char *broker) { strcpy(this->broker, broker); }
    void setPort(unsigned short port) { this->port = port; }
    void setPrefix(const char *prefix) { strcpy(this->prefix, prefix); }
    void saveConfig();
    bool loadConfig();
    void begin(const std::function<void(const char *, size_t)> &cb);
    bool update() { return mqtt.update(); }
};
