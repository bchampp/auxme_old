#include <Arduino.h>
#line 14 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino"
void setup();
#line 39 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino"
void loop();
#line 87 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino"
double convBrightness(int b);
#line 104 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino"
Color pitchConv(int p, int b);
#line 144 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino"
void setColor(Color *c, int r, int g, int b);
#line 151 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino"
void printColor(Color c);
#line 0 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino"
#line 1 "/Users/brent/Desktop/coding/auxme/controller/software/tests/test.cpp"
/* Template file for unit testing */
#line 1 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino"
#include <Adafruit_NeoPixel.h>

#define AUX_IN A0
#define STROBE 4
#define RESET 3
#define LED_PIN    6
#define GAIN 5
#define filter 120
#define LED_COUNT 144

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

int lastCount = 0;
int diff = 0;
int curTimes = 0;
int times = 150;

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
  int diff = count - lastCount;
  int numLeds = count;
  if(diff < 90){
    if(curTimes > times){
      curTimes++;
    } else {
      numLeds = lastCount; 
      curTimes = 0;
    }
  }
  if(curTimes > times){

  } else {
    strip.clear();
  for (int c = 0; c < numLeds; c += 1) {
    // hue of pixel 'c' is offset by an amount to make one full
    // revolution of the color wheel (range 65536) along the length
    // of the strip (strip.numPixels() steps):
    int      hue   = firstPixelHue + c * 65536L / strip.numPixels();
    uint32_t color = strip.gamma32(strip.ColorHSV(hue)); // hue -> RGB
    strip.setPixelColor(c, color); // Set pixel 'c' to value 'color' 
  }
  }
  strip.show();                // Update strip with new contents
  firstPixelHue += 65536 / 90; // One cycle of color wheel over 90 frames
  Serial.println();
  lastCount = count;
}

#line 1 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino"
/**
 * LED Music Visualizer
 * by Devon Crawford
 * using the FastLED library: http://fastled.io/
 * April 22, 2018
 * Watch the video: https://youtu.be/lU1GVVU9gLU
 */
#include <FastLED.h>

#define NUM_LEDS 144        // How many leds in your strip?
#define updateLEDS 8        // How many do you want to update every millisecond?
#define COLOR_SHIFT 180000  // Time for colours to shift to a new spectrum (in ms)
CRGB leds[NUM_LEDS];        // Define the array of leds

// Define the digital I/O PINS..
#define DATA_PIN 6          // led data transfer
#define PITCH_PIN 0         // pitch input from frequency to voltage converter
#define BRIGHT_PIN 0        // brightness input from amplified audio signal

// Don't touch these, internal color variation variables
unsigned long setTime = COLOR_SHIFT;
int shiftC = 0;
int mulC = 2;

// Define color structure for rgb
struct color {
  int r;
  int g;
  int b;
};
typedef struct color Color;

void setup() { 
    Serial.begin(9600);
  	FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
    pinMode(A0, INPUT);
    pinMode(A0, INPUT);

    for(int i = 0; i < NUM_LEDS ; i++) {
      leds[i] = CRGB(0,0,0);
    }
    FastLED.show();
}

void loop() { 
  unsigned long time = millis();

  // Shift the color spectrum by 200 on set intervals (setTime)
  if(time / (double)setTime >= 1) {
    setTime = time + COLOR_SHIFT;
    Serial.println(setTime);
    shiftC += 200;
    mulC++;
    if(shiftC >= 600) {
      shiftC = 0;
    }
    if(mulC > 3) {
      mulC = 2;
    }
  }

  // Shift all LEDs to the right by updateLEDS number each time
  for(int i = NUM_LEDS - 1; i >= updateLEDS; i--) {
    leds[i] = leds[i - updateLEDS];
  }

  // Get the pitch and brightness to compute the new color
  int newPitch = (analogRead(PITCH_PIN)*2) + shiftC;
  Color nc = pitchConv(newPitch, analogRead(BRIGHT_PIN));

  // Set the left most updateLEDs with the new color
  for(int i = 0; i < updateLEDS; i++) {
    leds[i] = CRGB(nc.r, nc.g, nc.b);
  }
  FastLED.show();

  //printColor(nc);
  delay(1);
}

/**
 * Converts the analog brightness reading into a percentage
 * 100% brightness is 614.. about 3 volts based on frequency to voltage converter circuit
 * The resulting percentage can simply be multiplied on the rgb values when setting our colors,
 * for example black is (0,0,0) so when volume is off we get 0v and all colors are black (leds are off)
 */
double convBrightness(int b) {
  double c = b / 614.0000;
  if( c < 0.2 ) {
    c = 0;
  }
  else if(c > 1) {
    c = 1.00;
  }
  return c;
}

/**
 * Creates a new color from pitch and brightness readings
 * int p         analogRead(pitch) representing the voltage between 0 and 5 volts
 * double b      analogRead(brightness) representing volume of music for LED brightness
 * returns Color structure with rgb values, which appear synced to the music
 */
Color pitchConv(int p, int b) {
  Color c;
  double bright = convBrightness(b);

  if(p < 40) {
    setColor(&c, 255, 0, 0);
  }
  else if(p >= 40 && p <= 77) {
    int b = (p - 40) * (255/37.0000);
    setColor(&c, 255, 0, b);
  }
  else if(p > 77 && p <= 205) {
    int r = 255 - ((p - 78) * 2);
    setColor(&c, r, 0, 255);
  }
  else if(p >= 206 && p <= 238) {
    int g = (p - 206) * (255/32.0000);
    setColor(&c, 0, g, 255);
  }
  else if(p <= 239 && p <= 250) {
    int r = (p - 239) * (255/11.0000);
    setColor(&c, r, 255, 255);
  }
  else if(p >= 251 && p <= 270) {
    setColor(&c, 255, 255, 255);
  }
  else if(p >= 271 && p <= 398) {
    int rb = 255-((p-271)*2);
    setColor(&c, rb, 255, rb);
  }
  else if(p >= 398 && p <= 653) {
    setColor(&c, 0, 255-(p-398), (p-398));
  }
  else {
    setColor(&c, 255, 0, 0);
  }
  setColor(&c, c.r * bright, c.g * bright, c.b * bright);
  return c;
}

void setColor(Color *c, int r, int g, int b) {
  c->r = r;
  c->g = g;
  c->b = b;
}

// Prints color structure data
void printColor(Color c) {
  Serial.print("( ");
  Serial.print(c.r);
  Serial.print(", ");
  Serial.print(c.g);
  Serial.print(", ");
  Serial.print(c.b);
  Serial.println(" )");
}
