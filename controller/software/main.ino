// Include Libraries 
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <Adafruit_NeoPixel.h>

// custom libraries
#include "visualizer/visualizer.h";
#include "interface/interface.h";

#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

int mode = 0;

typedef struct color {
  // color object representing RGB values
  int red;
  int green;
  int blue;
}; 

#define DEBUG true

// pin definitions
#define aux A0
#define pot A1
#define strobe 2
#define reset 3
#define led 6

// Constants
#define led_count 144
#define pot_low 0
#define pot_high 1023
#define aux_low 120
#define aux_high 840

// WiFi Credentials
char auth[] = "DafemG2lDYKwlMdmLxV6egEtb9oDcx5z";
char ssid[] = "Tilted Towers 2.4Ghz";
char pass[] = "wuckfestern";

// init NeoPixel Strip
Adafruit_NeoPixel strip(led_count, led, NEO_GRB + NEO_KHZ800);

BlynkTimer audioTimer;

/* Function Prototypes */
int getBrightness(int volume);
color getColor(int volume, int brightness);
void printData(int volume, int brightness, color pattern);

int getBrightness(int volume){
  // Currently not using volume to adjust brightness
  return map(analogRead(pot), pot_low, pot_high, 0, 255);
}

color getColor(int volume, int brightness){
  color output;
  output.red = 0;
  output.blue = 0;
  output.green = 0;

  // Add logic here to adjust colors based on a pattern



  return output;
}

void printData(int volume, int brightness, color pattern){
  Serial.println();

  Serial.print("Aux Volume: ");
  float vol = volume / 100;
  Serial.print(vol);
  Serial.print("% \t");

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

/* --- BLYNK Callback functions --- */

// Sensitivity
BLYNK_WRITE(V1){
  int val = param.asInt(); // Assigning value from pin 1 to variable
  if(DEBUG){
    Serial.print("Sensitivity Slider is: ");
    Serial.println(val);
  }
}

// Brightness
BLYNK_WRITE(V2){
  int val = param.asInt(); // Assigning value from pin 1 to variable
  if(DEBUG){
    Serial.print("Sensitivity Slider is: ");
    Serial.println(val);
  }
}

// Color
BLYNK_WRITE(V3){
  r = param[0].asInt();
  g = param[1].asInt();
  b = param[2].asInt();
}

// Mode 
BLYNK_WRITE(V4){
  mode = param.asInt();
}

void audioEvent(){
// pulse MSGEQ7 strobe 
  digitalWrite(strobe, HIGH); digitalWrite(strobe, LOW);

  // let output settle from pulse
  delayMicroseconds(25);

  // map filtered aux signal from 0 to 1000
  int volume = map(constrain(analogRead(aux), aux_low, aux_high), aux_low, aux_high, 0, 1000); 
  
  // get brightness level
  int brightness = getBrightness(volume);

  // get color pattern
  color pattern = getColor(volume, brightness);
 
  if(DEBUG){
    printData(volume, brightness, pattern);
  }

  Blynk.virtualWrite(V5, volume);
}

void setup() {
  if(DEBUG){ Serial.begin(9600); }

  // Init WIFI connection
  Blynk.begin(auth, ssid, pass);
  pixels.begin();

  // pin assignments
  pinMode(aux, INPUT);
  pinMode(pot, INPUT);

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

  // Tie timers to callback functions
  audioTimer.setInterval(200L, audioEvent);
}
 
void loop() {
  Blynk.run();
  audioTimer.run();
}