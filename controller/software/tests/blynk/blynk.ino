/*code written by Struan Lawrie
 * with parts taken from strandtest example for neopixels and blynk examples
 * 
 * WIRING:
 * NodeMCU or any other esp8266 module
 * GND of neopixels to MCU GND
 * DATA of neopixels to MCU pin D3
 * +5V of Neopixels to SEPERATE 5V POWER SUPPLY!!! otherwise neopixels draw too much current and
 * fry the esp8266
 * connect power supply GND to MCU GND
 */


// Comment this out to disable prints and save space
#define BLYNK_PRINT Serial

//include libraries
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <Adafruit_NeoPixel.h>

#define PIN 3
#define numberOfNeopixels 30

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(numberOfNeopixels, PIN, NEO_GRB + NEO_KHZ800);

// IMPORTANT: To reduce NeoPixel burnout risk, add 1000 uF capacitor across
// pixel power leads, add 300 - 500 Ohm resistor on first pixel's data input
// and minimize distance between Arduino and first pixel.  Avoid connecting
// on a live circuit...if you must, connect GND first.

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "DafemG2lDYKwlMdmLxV6egEtb9oDcx5z";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "brent-wifi-super-fast";
char pass[] = "wuckfestern";

int Brightness; // variable to change brightness
int ColourNumber; 
int red;   //
int green; // variables for custom colour
int blue;  //

BLYNK_WRITE(V1) //read slider value
{
  int pinValue = param.asInt(); // assigning incoming value from pin V1 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  Serial.print("V1 Slider value is: ");
  Serial.println(pinValue);
  Brightness = map(pinValue, 0, 1023, 0, 255);
}

BLYNK_WRITE(V2) //read button value
{
  int pinValue = param.asInt(); // assigning incoming value from pin V2 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  if (pinValue == 1) {
    rainbowCycle(20);
    strip.Color(0, 0, 0);
    strip.show();
  }
  Serial.print("Button value: ");
  Serial.println(pinValue);
}

BLYNK_WRITE(V3) //read button value
{
  int pinValue = param.asInt(); // assigning incoming value from pin V3 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  if (pinValue == 1) {
    switch (ColourNumber) {
      case 1: {
          ColourNumber = 1;
          colorWipe(strip.Color(Brightness, 0, 0), 50); // Red
          Serial.println("1");
          break;
        }
      case 2: {
          ColourNumber = 2;
          colorWipe(strip.Color(0, Brightness, 0), 50); // Green
          Serial.println("2");
          break;
        }
      case 3: {
          ColourNumber = 3;
          colorWipe(strip.Color(0, 0, Brightness), 50); // Blue
          Serial.println("3");
          break;
        }
      case 4: {
          ColourNumber = 4;
          colorWipe(strip.Color(Brightness, Brightness, 0), 50); // Yellow
          Serial.println("4");
          break;
        }
      case 5: {
          ColourNumber = 5;
          colorWipe(strip.Color(Brightness, 0, Brightness), 50); // Purple
          Serial.println("5");
          break;
        }
      case 6: {
          ColourNumber = 6;
          colorWipe(strip.Color(0, Brightness, Brightness), 50); // Turquiose
          Serial.println("6");
          break;
        }
      case 7: {
          ColourNumber = 7;
          colorWipe(strip.Color(Brightness, Brightness, Brightness), 50); // White
          Serial.println("7");
          break;
        }
      case 8: {
          ColourNumber = 8;
          colorWipe(strip.Color(0, 0, 0), 50); // Off
          Serial.println("8");
          break;
        }
      case 9: {
          ColourNumber = 9;
          colorWipe(strip.Color(red, green, blue), 50); // Custom
          Serial.println("9");
          break;
        }
    }
  }
  Serial.print("Button value: ");
  Serial.println(pinValue);
}

BLYNK_WRITE(V0) //read menu value
{
  switch (param.asInt()) {
    case 1: {
        ColourNumber = 1;
        colorWipe(strip.Color(Brightness, 0, 0), 50); // Red
        Serial.println("1");
        break;
      }
    case 2: {
        ColourNumber = 2;
        colorWipe(strip.Color(0, Brightness, 0), 50); // Green
        Serial.println("2");
        break;
      }
    case 3: {
        ColourNumber = 3;
        colorWipe(strip.Color(0, 0, Brightness), 50); // Blue
        Serial.println("3");
        break;
      }
    case 4: {
        ColourNumber = 4;
        colorWipe(strip.Color(Brightness, Brightness, 0), 50); // Yellow
        Serial.println("4");
        break;
      }
    case 5: {
        ColourNumber = 5;
        colorWipe(strip.Color(Brightness, 0, Brightness), 50); // Purple
        Serial.println("5");
        break;
      }
    case 6: {
        ColourNumber = 6;
        colorWipe(strip.Color(0, Brightness, Brightness), 50); // Turquiose
        Serial.println("6");
        break;
      }
    case 7: {
        ColourNumber = 7;
        colorWipe(strip.Color(Brightness, Brightness, Brightness), 50); // White
        Serial.println("7");
        break;
      }
    case 8: {
        ColourNumber = 8;
        colorWipe(strip.Color(0, 0, 0), 50); // Off
        Serial.println("8");
        break;
      }
    case 9: {
        ColourNumber = 9;
        colorWipe(strip.Color(red, green, blue), 50); // Custom
        Serial.println("9");
        break;
      }
  }
}

BLYNK_WRITE(V4) //read slider value for red
{
  int pinValue = param.asInt(); // assigning incoming value from pin V4 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  Serial.print("red Slider value is: ");
  Serial.println(pinValue);
  red = map(pinValue, 0, 1023, 0, 255);
}

BLYNK_WRITE(V5) //read slider value for red
{
  int pinValue = param.asInt(); // assigning incoming value from pin V5 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  Serial.print("green Slider value is: ");
  Serial.println(pinValue);
  green = map(pinValue, 0, 1023, 0, 255);
}

BLYNK_WRITE(V6) //read slider value for red
{
  int pinValue = param.asInt(); // assigning incoming value from pin V6 to a variable
  // You can also use:
  // String i = param.asStr();
  // double d = param.asDouble();
  Serial.print("red Slider value is: ");
  Serial.println(pinValue);
  blue = map(pinValue, 0, 1023, 0, 255);
}

void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);

  strip.begin(); //start neopixels
  strip.show(); //set all to 'off'
}

void loop()
{
  Blynk.run(); // run blynk
}

// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}

//rainbow cycle
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;
  for (j = 1; j < 256 * 20; j++) { // 10 cycles of all colors on wheel
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}
