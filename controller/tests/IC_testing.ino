#define AUX_IN A0
#define STROBE 2
#define RESET 3


void setup(){
    Serial.begin(9600);

    // Init Pins
    pinMode(AUX_IN, INPUT);
    pinMode(STROBE, OUTPUT);
    pinMode(RESET, OUTPUT);

    // Set frequency
    digitalWrite(STROBE, HIGH);
    digitalWrite(RESET, HIGH);

}

void loop(){
    int x = analogRead(AUX_IN);
    Serial.print("Aux Voltage: ");
    Serial.print(x);
    Serial.println();
}