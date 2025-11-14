// LED test for backend → Arduino communication
// LED turns ON if ANY serial data is received

int led = 11;   // In-built LED

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);
}

void loop() {

  if (Serial.available() > 0) { 
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();   // remove spaces & newline

    if (cmd.length() > 0) {
      // If ANY non-empty data received → turn ON LED
      digitalWrite(led, HIGH);
      Serial.println("Data received: " + cmd);
    } 
    else {
      // Empty line (when you press ENTER) → treat as no data
      digitalWrite(led, LOW);
      Serial.println("No valid data");
    }
    delay(1000);
     digitalWrite(led, LOW);
  }
}
