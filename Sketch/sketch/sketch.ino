#define BLYNK_PRINT Serial    // Comment this out to disable prints and save space
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>


char auth[] = "b53c5fe6c4494e74be19950dda122723";
long startTime = 0;
int pinRelay = D8;
int pinDebug = D3;

int rainPin = A0;
int rainDigitalIn = D2;



void DebugWithLed(int n) {
  delay(1000);
  for(int i = 0; i < n; i++) {
    digitalWrite(pinDebug, HIGH);
    delay(500);
    digitalWrite(pinDebug, LOW);
    delay(500);
  }

}
// Attach BUTTON_PIN interrupt to our handler
void setup()
{
  Serial.begin(9600);
  delay(10);
  Serial.println("Rock'n roll");
 Blynk.begin(auth, "XT1032 5747", "", "40.127.133.115", 8442);
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
  DebugWithLed(1);
  Blynk.run();
  checkTimer();
  checkIsRaining();
}





