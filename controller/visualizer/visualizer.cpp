/*
  Visualizer.cpp - Library for Visualizing Aux Signals on LEDs
*/

#include "Arduino.h"
#include "Visualizer.h"

Visualizer::Visualizer(int voltagePin, int frequencyPin, int stripPin)
{
    pinMode(voltagePin, INPUT);
    pinMode(frequencyPin, INPUT);
    pinMode(stripPin, OUTPUT);

    // Set up a pointer to read the value of the input pins to the '_' fields
}

/* Getters */

void Visualizer::getPattern()
{
  return _pattern;
}

float Visualizer::getVoltage()
{
  return _inputVoltage;
}

void Visualizer::getFrequency()
{
  return _inputFrequency;
}


/* Setters */

void Visualizer::setPattern(int pattern)
{
  _pattern = pattern;
}