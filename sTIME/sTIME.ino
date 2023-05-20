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
#include <addons/TokenHelper.h>

//Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

//Secrets
#include "secrets.h"

//Define Firebase Data objects
FirebaseData stream;
// Define the FirebaseAuth data for authentication data
FirebaseAuth auth;
// Define the FirebaseConfig data for config data
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

bool signupOK = false;

unsigned long interval = 1000;
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

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);

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

  if (!Firebase.RTDB.beginStream(&stream, "/sTIMEdb/sTIME"))
    Serial.printf("sream begin error, %s\n\n", stream.errorReason().c_str());
}

void loop() {
  // Firebase.ready() should be called repeatedly to handle authentication tasks.
  if (!Firebase.ready())
    return;

  // Please avoid to use delay or any third party libraries that use delay internally to wait for hardware to be ready in this loop.
  if (!Firebase.RTDB.readStream(&stream))
    Serial.printf("sream read error, %s\n\n", stream.errorReason().c_str());

  if (stream.streamTimeout()) {
    Serial.println("stream timed out, resuming...\n");

    if (!stream.httpConnected())
      Serial.printf("error code: %d, reason: %s\n\n", stream.httpCode(), stream.errorReason().c_str());
  }

  if (stream.streamAvailable()) {
    Serial.printf("sream path, %s\nevent path, %s\ndata type, %s\nevent type, %s\n\n",
                  stream.streamPath().c_str(),
                  stream.dataPath().c_str(),
                  stream.dataType().c_str(),
                  stream.eventType().c_str());
    printResult(stream);                     // see addons/RTDBHelper.h
    interval = (stream.to<float>()) * 1000;  // set interval to sTIME
    Serial.println(interval);
    Serial.println();

    // This is the size of stream payload received (current and max value)
    // Max payload size is the payload size under the stream path since the stream connected
    // and read once and will not update until stream reconnection takes place.
    // This max value will be zero as no payload received in case of ESP8266 which
    // BearSSL reserved Rx buffer size is less than the actual stream payload.
    Serial.printf("Received stream payload size: %d (Max. %d)\n\n", stream.payloadLength(), stream.maxPayloadLength());
  }

  if (millis() - sendDataPrevMillis >= interval || sendDataPrevMillis == 0) {
    sendDataPrevMillis = millis();
    // toggle the LED
    ledState = !ledState;
    digitalWrite(BUILTIN_LED, ledState);
  }
}