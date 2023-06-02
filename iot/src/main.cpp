#include "main.h"
void configModeCallback(ESP_WiFiManager *wifiManager)
{
  Serial.println("Entered Configuration Mode");
  Serial.print("Config SSID: ");
  Serial.println(wifiManager->getConfigPortalSSID());
  Serial.print("Config IP Address: ");
  Serial.println(WiFi.softAPIP());
}

void startAP(bool (ESP_WiFiManager::*func)(const char *, const char *))
{
  if (!(wm.*func)("NexGenMeal Terminal", "12345678"))
  {
    Serial.println("failed to connect and hit timeout");
    delay(3000);
    ESP.restart();
    delay(5000);
  }
}
void MQTTCallback(const String &payload, const size_t size)
{
  Serial.print("Message arrived: ");
  int i = payload.toInt();
  Serial.println(i);
  if (i < N_CELLS)
  {
    servos[i].write(45);
    delay(delayMS);
    servos[i].write(0);
  }
}

void saveConfigCallback()
{
  shouldSaveConfig = true;
}

void setup()
{
  WiFi.mode(WIFI_STA);
  Serial.begin(115200);
  for (int i = 0; i < N_CELLS; i++)
  {
    servos[i].attach(servoPins[i]);
    servos[i].write(0);
  }
  pinMode(LED_PIN, OUTPUT);
  preferences.begin("MQTT", false);

  wm.setAPCallback(configModeCallback);
  wm.setSaveConfigCallback(saveConfigCallback);
  wm.setConfigPortalTimeout(TIMEOUT);

  bool isEmpty = client.loadConfig();

  ESP_WMParameter broker_text_box("broker", "Enter MQTT Broker", client.getBroker(), 50);
  char convertedValue[8];
  sprintf(convertedValue, "%d", client.getPort());
  ESP_WMParameter port_text_box("port", "Enter MQTT port", convertedValue, 9);
  ESP_WMParameter topic_text_box("prefix", "Enter MQTT prefix", client.getPrefix(), 50);

  wm.addParameter(&broker_text_box);
  wm.addParameter(&port_text_box);
  wm.addParameter(&topic_text_box);
  if (!isEmpty || drd.detectDoubleReset())
    startAP(&ESP_WiFiManager::startConfigPortal);
  else
    startAP(&ESP_WiFiManager::autoConnect);

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  client.setBroker(broker_text_box.getValue());
  client.setPort(atoi(port_text_box.getValue()));
  client.setPrefix(topic_text_box.getValue());

  if (shouldSaveConfig)
    client.saveConfig();
  client.begin(MQTTCallback);
}

void loop()
{
  analogWrite(LED_PIN, (WiFi.status() == WL_CONNECTED) ? 255 : 0);
  client.update();
  drd.loop();
}