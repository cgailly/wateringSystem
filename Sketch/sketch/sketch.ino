#include <SoftwareSerial.h>
SoftwareSerial SwSerial(2, 3); // RX, TX
#define BLYNK_PRINT SwSerial
#include <BlynkSimpleSerial.h>
char auth[] = "b53c5fe6c4494e74be19950dda122723";
long startTime = 0;
int pinRelay = 8;
int rainPin = A1;
int rainDigitalIn = 2;

// Attach BUTTON_PIN interrupt to our handler
void setup()
{
  Serial.begin(9600);
  Blynk.begin(auth);
  pinMode(pinRelay, OUTPUT);
  digitalWrite(pinRelay, LOW);
  pinMode(rainDigitalIn,INPUT);
  pinMode(rainPin,INPUT);
  
}

void startTimer ()
{
  startTime = millis();
}

BLYNK_WRITE(1) 
{
    if (param.asInt()) {
        //HIGH
        startTimer();
        digitalWrite(pinRelay, HIGH);   
    } else {
       startTime = 0;
        digitalWrite(pinRelay, LOW); 
    }
}



void checkTimer()
{
  if(startTime == 0) {
    return;
  }

  long current = millis();
  if(current - startTime > 3000) {
    digitalWrite(pinRelay, LOW);  
    Blynk.virtualWrite(V1, 0);
    startTime = 0;
  }
}
int n = 0;
long lastCheck = 0;
void checkIsRaining()
{
  long current = millis();

  int rainValue = analogRead(rainPin);
  bool isRaining = !(digitalRead(rainDigitalIn));
  n = (n+1)%1000;
  
   if(current - lastCheck > 5000) {
    lastCheck = current;
    Blynk.virtualWrite(V2, rainValue);
    startTime = 0;
  }

}

void loop()
{
  Blynk.run();
  checkTimer();
  checkIsRaining();
}




