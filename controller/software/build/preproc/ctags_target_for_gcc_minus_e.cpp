# 1 "/Users/brent/Desktop/coding/auxme/controller/software/tests/test.cpp"
/* Template file for unit testing */
# 1 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino"
# 2 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino" 2
# 11 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization.ino"
int firstPixelHue = 0; // First pixel starts at red (hue 0)

Adafruit_NeoPixel strip(144, 6, ((1<<6) | (1<<4) | (0<<2) | (2)) /*|< Transmit as G,R,B*/ + 0x0000 /*|< 800 KHz data transmission*/);
void setup() {
  Serial.begin(9600);

  // Init Pins
  pinMode(A0, 0x0);
  pinMode(4, 0x1);
  pinMode(3, 0x1);
  pinMode(5, 0x1);

  // Set frequency
  digitalWrite(3, 0x1);
  digitalWrite(3, 0x0);

  // Tie Gain to low 
  digitalWrite(5, 0x1);
  // NeoPixels
  strip.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show(); // Turn OFF all pixels ASAP
}

int lastCount = 0;
int diff = 0;
int curTimes = 0;
int times = 150;

void loop() {
  digitalWrite(4, 0x1);
  digitalWrite(4, 0x0);
  delayMicroseconds(22); // let output settle
  int x = ((analogRead(A0))<(120)?(120):((analogRead(A0))>(1023)?(1023):(analogRead(A0))));
  Serial.print("Aux Voltage: ");
  Serial.print(x);
  delayMicroseconds(100); // allow analog reading to settle
  strip.clear(); //   Set all pixels in RAM to 0 (off)
  // 'c' counts up from 'b' to end of strip in increments of 3...
  int count = map(x, 120, 800, 0, 144);
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
    int hue = firstPixelHue + c * 65536L / strip.numPixels();
    uint32_t color = strip.gamma32(strip.ColorHSV(hue)); // hue -> RGB
    strip.setPixelColor(c, color); // Set pixel 'c' to value 'color' 
  }
  }
  strip.show(); // Update strip with new contents
  firstPixelHue += 65536 / 90; // One cycle of color wheel over 90 frames
  Serial.println();
  lastCount = count;
}
# 1 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino"
/**
 * LED Music Visualizer
 * by Devon Crawford
 * using the FastLED library: http://fastled.io/
 * April 22, 2018
 * Watch the video: https://youtu.be/lU1GVVU9gLU
 */
# 9 "/Users/brent/Desktop/coding/auxme/controller/software/tests/visualization2.ino" 2




CRGB leds[144 /* How many leds in your strip?*/]; // Define the array of leds

// Define the digital I/O PINS..




// Don't touch these, internal color variation variables
unsigned long setTime = 180000 /* Time for colours to shift to a new spectrum (in ms)*/;
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
   FastLED.addLeds<NEOPIXEL, 6 /* led data transfer*/>(leds, 144 /* How many leds in your strip?*/);
    pinMode(A0, 0x0);
    pinMode(A0, 0x0);

    for(int i = 0; i < 144 /* How many leds in your strip?*/ ; i++) {
      leds[i] = CRGB(0,0,0);
    }
    FastLED.show();
}

void loop() {
  unsigned long time = millis();

  // Shift the color spectrum by 200 on set intervals (setTime)
  if(time / (double)setTime >= 1) {
    setTime = time + 180000 /* Time for colours to shift to a new spectrum (in ms)*/;
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
  for(int i = 144 /* How many leds in your strip?*/ - 1; i >= 8 /* How many do you want to update every millisecond?*/; i--) {
    leds[i] = leds[i - 8 /* How many do you want to update every millisecond?*/];
  }

  // Get the pitch and brightness to compute the new color
  int newPitch = (analogRead(0 /* pitch input from frequency to voltage converter*/)*2) + shiftC;
  Color nc = pitchConv(newPitch, analogRead(0 /* brightness input from amplified audio signal*/));

  // Set the left most updateLEDs with the new color
  for(int i = 0; i < 8 /* How many do you want to update every millisecond?*/; i++) {
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
