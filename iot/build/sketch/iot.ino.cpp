#include <Arduino.h>
#line 1 "D:\\Source\\NextGenMeal\\iot\\iot.ino"
#define LED 2
#line 2 "D:\\Source\\NextGenMeal\\iot\\iot.ino"
void setup();
#line 7 "D:\\Source\\NextGenMeal\\iot\\iot.ino"
void loop();
#line 2 "D:\\Source\\NextGenMeal\\iot\\iot.ino"
void setup()
{
    pinMode(LED, OUTPUT);
}

void loop()
{
    delay(1500);
    digitalWrite(LED, HIGH);
    delay(500);
    digitalWrite(LED, LOW);
}

