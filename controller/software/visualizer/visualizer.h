/* Template file for the Visualization Library */

/* 
- Currently set up to read the inputs from aux
- Not implemented with LED's - do we want to extend the neopixel class? 

TODO: 
    - Add implementation with controller library (for arduino control)

*/
#ifndef Visualize_h
#define Visualize_h

#include "Arduino.h"

class Visualizer {
    public: 
        Visualizer(int voltagePin, int frequencyPin, int stripPin); // Constructor - madd a connection with the server here? 

        // Getters
        float getVoltage();
        float getFrequency();
        void getPattern();

        // Setters
        void setPattern();

    private: 
        int _pattern; // Pattern Mode
        int _inputVoltage; // Input Arduino Voltage for aux signal 
        int _inputFrequency; // Input Arduino Frequency for aux signal
};

#endif