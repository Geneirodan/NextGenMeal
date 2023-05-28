# 1 "D:\\Source\\NextGenMeal\\iot\\iot.ino"

void setup()
{
    pinMode(2, 0x03);
}

void loop()
{
    delay(1500);
    digitalWrite(2, 0x1);
    delay(500);
    digitalWrite(2, 0x0);
}
