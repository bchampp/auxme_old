#include <Adafruit_NeoPixel.h>

#define AUX_IN A0
#define STROBE 4
#define RESET 3
#define LED_PIN    6
#define GAIN 5
#define filter 120
#define LED_COUNT 300

int firstPixelHue = 0;     // First pixel starts at red (hue 0)

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
void setup() {
  Serial.begin(9600);

  // Init Pins
  pinMode(AUX_IN, INPUT);
  pinMode(STROBE, OUTPUT);
  pinMode(RESET, OUTPUT);
  pinMode(GAIN, OUTPUT);
  
  // Set frequency
  digitalWrite(RESET, HIGH);
  digitalWrite(RESET, LOW);

  // Tie Gain to low 
  digitalWrite(GAIN, HIGH);
  // NeoPixels
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
}

void loop() {
  digitalWrite(STROBE, HIGH);
  digitalWrite(STROBE, LOW);
  delayMicroseconds(22); // let output settle
  int x = constrain(analogRead(AUX_IN), filter, 1023);
  Serial.print("Aux Voltage: ");
  Serial.print(x);
  delayMicroseconds(100); // allow analog reading to settle
  strip.clear();         //   Set all pixels in RAM to 0 (off)
  // 'c' counts up from 'b' to end of strip in increments of 3...
  int count = map(x, filter, 800, 0, LED_COUNT);
  for (int c = 0; c < count; c += 1) {
    // hue of pixel 'c' is offset by an amount to make one full
    // revolution of the color wheel (range 65536) along the length
    // of the strip (strip.numPixels() steps):
    int      hue   = firstPixelHue + c * 65536L / strip.numPixels();
    uint32_t color = strip.gamma32(strip.ColorHSV(hue)); // hue -> RGB
    strip.setPixelColor(c, color); // Set pixel 'c' to value 'color' 
  }
  strip.show();                // Update strip with new contents
  firstPixelHue += 65536 / 90; // One cycle of color wheel over 90 frames
  Serial.println();
  
}
