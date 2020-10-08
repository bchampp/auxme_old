#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <Adafruit_NeoPixel.h>
#define PIN 15
#define NUM 144
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUM, PIN, NEO_GRB + NEO_KHZ800);
char auth[] = "DafemG2lDYKwlMdmLxV6egEtb9oDcx5z";
char ssid[] = "Tilted Towers 2.4Ghz";
char pass[] = "wuckfestern";
int r, g, b, data;

void setup()
{
  Serial.begin(115200);
  Blynk.begin(auth, ssid, pass);
  pixels.begin();
}
void loop()
{
  Blynk.run();
}

BLYNK_WRITE(V2)
{
  r = param[0].asInt();
  g = param[1].asInt();
  b = param[2].asInt();
  if (data == 0)
    static1(r, g, b);
}

BLYNK_WRITE(V3)
{
  data = param.asInt();
  Serial.println(data);
  if (data == 0)
  {
    static1(r, g, b);
  }
  else if (data == 1)
  {
    animation1();
  }
}

void static1(int r, int g, int b)
{
  Serial.print("Red: ");
  Serial.print(r);
  Serial.print("\tBlue: ");
  Serial.print(b);
  Serial.print("\tGreen: ");
  Serial.print(g);
  Serial.println();
  
  for (int i = 0; i <= NUM; i++)
  {
    pixels.setPixelColor(i, pixels.Color(r, g, b));
  }
  pixels.show();
}
void animation1()
{
  for (int i = 0; i < NUM; i++)
  {
    pixels.setPixelColor(i, pixels.Color(255, 0, 0));
    pixels.show();
    delay(100);
  }
  for (int i = NUM; i >= 0; i--)
  {
    pixels.setPixelColor(i, pixels.Color(0, 255, 0));
    pixels.show();
    delay(100);
  }
  for (int i = 0; i < NUM; i++)
  {
    pixels.setPixelColor(i, pixels.Color(0, 255, 255));
    pixels.show();
    delay(100);
  }
  for (int i = NUM; i >= 0; i--)
  {
    pixels.setPixelColor(i, pixels.Color(255, 255, 0));
    pixels.show();
    delay(100);
  }
}
