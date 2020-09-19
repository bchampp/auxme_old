# Controller 

## PCB

A Custom PCB has been designed for the hardware interface to the LED strips. The primary components of the PCB are: 
- ESP8266 WiFi Module 
- MSGEQ7 Audio Processing IC
- Arduino Microphone Breakout board 
- Arduino Uno 

The Custom PCB was designed using Altium Designer 19 and JLCPCB was used to manufacture the board. 

## Software

### Visualizer 
The Visualizer contains all the code regarding converting the aux signals to LED outputs. This class inherits properties from the app class to control how the LED's function. 

### Interface
The Interface library contains code regarding the interface with the web server. 

### Tests
The Tests folder contains various unit tests for the custom C++ libraries. 

### Examples
The examples folder contains code samples for various things, such as testing the wifi module, the Audio processing and various visual effects for the NeoPixels. 