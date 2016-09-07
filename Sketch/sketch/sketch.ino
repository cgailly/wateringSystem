#define BLYNK_PRINT Serial    // Comment this out to disable prints and save space
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>


char auth[] = "b92369a1ae554debbfcaa5f3f9bc7bb7";
long startTime = 0;
int pinRelay = D5;

int rainPin = A0;
int rainDigitalIn = D2;




// Attach BUTTON_PIN interrupt to our handler
void setup()
{
  Serial.begin(9600);
  Serial.println("Rock'n roll");
  pinMode(D5, OUTPUT); 
 delay(10);
 Blynk.begin(auth, "XT1032 5747", "", "13.74.253.190", 8442);
 
}



void startTimer ()
{
  startTime = millis();
  digitalWrite(pinRelay, HIGH);   
}

BLYNK_WRITE(1) 
{
      if (param.asInt()) {
        //HIGH
        startTimer();
        Serial.println("LEd ON");
        digitalWrite(pinRelay, HIGH);   
    } else {
       startTime = 0;
       Serial.println("LEd OFF");
        digitalWrite(pinRelay, LOW); 
    }
}



void checkTimer()
{
  if(startTime == 0) {
    return;
  }

  long current = millis();
  long duration = current - startTime;
  Serial.print("Duration");
  if(current - startTime > 3000) {
    digitalWrite(pinRelay, LOW); 
    Serial.println("Set LEd OFF"); 
    Blynk.virtualWrite(V1, 0);
    startTime = 0;
  }
}
int n = 0;
long lastCheck = 0;
void checkIsRaining()
{
  long current = millis();

 
//  bool isRaining = !(digitalRead(rainDigitalIn));

  n = (n+1)%1000;
  
   if(current - lastCheck > 5000) {
    
     int rainValue = analogRead(rainPin);
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





