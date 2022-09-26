/*
  'time is the intuition of ourselves and our inner space'
    - john cage
  'sTIME' a time subjectivizer app
    by leandro estrella  [leandroestrella.com]
*/

#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

//Secrets
#include "secrets.h"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int intValue;
float floatValue;
double doubleValue;
bool signupOK = false;

long interval = 1000;
int ledState = LOW;

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);  // initialize onboard LED as output

  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback;  //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis >= interval || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    if (Firebase.RTDB.getFloat(&fbdo, "/sTIMEdb/sTIME")) {
      if (fbdo.dataType() == "float") {
        floatValue = long(fbdo.floatData()) * 1000;
        interval = floatValue;
        Serial.println(floatValue);
      } else if (fbdo.dataType() == "double") {
        doubleValue = long(fbdo.doubleData()) * 1000;
        interval = doubleValue;
        Serial.println(doubleValue);
      } else if (fbdo.dataType() == "int") {
        intValue = long(fbdo.intData()) * 1000;
        interval = intValue;
        Serial.println(intValue);
      } else {
        Serial.println(fbdo.dataType());
      }
    } else {
      Serial.println(fbdo.errorReason());
    }

    // toggle the LED
    ledState = !ledState;
    digitalWrite(BUILTIN_LED, ledState);
  }
}