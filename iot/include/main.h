#include <Arduino.h>
#include <Servo.h>
#include <ESP_WiFiManager.h>
#include <Preferenced_MQTT_Client.h>

#define ESP_DRD_USE_EEPROM      false
#define ESP_DRD_USE_SPIFFS      true

#include <ESP_DoubleResetDetector.h>

#define LED_PIN                 2
#define TIMEOUT                 120
#define N_CELLS                 1
#define delayMS                 10000
#define DRD_TIMEOUT             10
#define DRD_ADDRESS             0



int servoPins[N_CELLS]{13};
Servo servos[N_CELLS];

ESP_WiFiManager wm;
DoubleResetDetector drd(DRD_TIMEOUT, DRD_ADDRESS);
Preferenced_MQTT_Client client;

bool shouldSaveConfig = false;