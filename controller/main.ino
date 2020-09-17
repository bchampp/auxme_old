#include <Adafruit_NeoPixel.h>

// custom libraries
#include "visualizer/visualizer.h";
#include "interface/interface.h";

#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

typedef struct color {
  // color object representing RGB values
  int red;
  int green;
  int blue;
}; 

#define DEBUG true

// pin definitions
#define aux A0
#define strobe 2
#define reset 3
#define led 6

// Constants
#define led_count 144
#define low 120
#define high 840

// init NeoPixel Strip
Adafruit_NeoPixel strip(led_count, led, NEO_GRB + NEO_KHZ800);

void setup() {
  if(DEBUG){ Serial.begin(9600); }

  // pin assignments
  pinMode(aux, INPUT);

  pinMode(strobe, OUTPUT);
  pinMode(reset, OUTPUT);

  // assert href to default 
  analogReference(DEFAULT);

  // init LED strip
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP

  // reset the MSGEQ7
  digitalWrite(reset, HIGH);
  digitalWrite(reset, LOW);
}
 
void loop() {
  // pulse MSGEQ7 strobe 
  digitalWrite(strobe, HIGH); digitalWrite(strobe, LOW);

  // let output settle from pulse
  delayMicroseconds(25);

  // map filtered aux signal from 0 to 1000
  int volume = map(constrain(analogRead(aux), low, high), low, high, 0, 1000); 
  
  // get brightness level
  int brightness = getBrightness(volume);

  // get color pattern
  color pattern = getColor(volume, brightness);

  // let output settle
  delayMicroseconds(100); 

  if(DEBUG){
    printData(volume, brightness, pattern);
  }
}

void printData(int volume, int brightness, color pattern){
  Serial.println();
  
  Serial.print("Aux Volume: ");
  float vol = volume / 100;
  Serial.print(vol)
  Serial.print("% \t")

  Serial.print("Brightness: ");
  Serial.print(map(brightness, 0, 255, 0, 100));
  Serial.print("% \t");

  Serial.print("RED: ");
  Serial.print(map(pattern.red, 0, 255, 0, 100));
  Serial.print("% \t");

  Serial.print("GREEN: ");
  Serial.print(map(pattern.green, 0, 255, 0, 100));
  Serial.print("% \t");

  Serial.print("BLUE: ");
  Serial.print(map(pattern.blue, 0, 255, 0, 100));
  Serial.print("% \t");
}

// Rainbow-enhanced theater marquee. Pass delay time (in ms) between frames.
void theaterChaseRainbow(int wait) {
  int firstPixelHue = 0;     // First pixel starts at red (hue 0)
  for(int a=0; a<30; a++) {  // Repeat 30 times...
    for(int b=0; b<3; b++) { //  'b' counts from 0 to 2...
      strip.clear();         //   Set all pixels in RAM to 0 (off)
      // 'c' counts up from 'b' to end of strip in increments of 3...
      for(int c=b; c<strip.numPixels(); c += 3) {
        // hue of pixel 'c' is offset by an amount to make one full
        // revolution of the color wheel (range 65536) along the length
        // of the strip (strip.numPixels() steps):
        int      hue   = firstPixelHue + c * 65536L / strip.numPixels();
        uint32_t color = strip.gamma32(strip.ColorHSV(hue)); // hue -> RGB
        strip.setPixelColor(c, color); // Set pixel 'c' to value 'color'
      }
      strip.show();                // Update strip with new contents
      delay(wait);                 // Pause for a moment
      firstPixelHue += 65536 / 90; // One cycle of color wheel over 90 frames
    }
  }
}
