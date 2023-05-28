#include <Preferenced_MQTT_Client.h>

Preferenced_MQTT_Client::Preferenced_MQTT_Client()
{
    preferences.begin("MQTT", false);
}

void Preferenced_MQTT_Client::saveConfig()
{
    preferences.putString("broker", broker);
    preferences.putInt("port", port);
    preferences.putString("topic", prefix);
}
bool Preferenced_MQTT_Client::loadConfig()
{
    port = preferences.getInt("port", 1883);
    String brokerValue = preferences.getString("broker", "");
    String prefixValue = preferences.getString("prefix", "");
    strcpy(broker, brokerValue.c_str());
    strcpy(prefix, prefixValue.c_str());
    return strlen(broker) + strlen(prefix);
}

void Preferenced_MQTT_Client::begin(const std::function<void(const char *, size_t)> &cb)
{
    String topic = String(prefix) + '/' + String(SERIAL_NUMBER);
    Serial.print("Connecting ");
    Serial.print(broker);
    Serial.print(":");
    Serial.print(port);
    Serial.print(" on topic ");
    Serial.println(topic);
    client.connect(broker, port);
    mqtt.begin(client);
    mqtt.connect(topic);
    mqtt.subscribe(topic, cb);
}