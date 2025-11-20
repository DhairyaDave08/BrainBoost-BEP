#include <Servo.h>

#define SERVO_PIN 9

// LED + BUZZER
#define GREEN_LED 10
#define RED_LED   8
#define BUZZER    6

Servo s;
int cur = 0;

// Smooth movement
void moveSmooth(int target) {
  target = constrain(target, 0, 180);
  if (target == cur) return;

  int dir = (target > cur) ? 1 : -1;
  while (cur != target) {
    cur += dir;
    s.write(cur);
    delay(3);
  }
}

// Always return to 0
void goHome() {
  moveSmooth(0);
  delay(150);
}

// Perform n rotations, where each rotation = 36°
void rotateN(int n) {
  if (n <= 0) return;
  goHome();

  int target = n * 36;
  target = constrain(target, 0, 180);

  moveSmooth(target);
  delay(200);

  goHome();
}

// Serial integer reader
int readInt() {
  static String t = "";
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\n' || c == '\r') {
      if (t.length() > 0) {
        int v = t.toInt();
        t = "";
        return v;
      }
    } else {
      t += c;
    }
  }
  return -999;
}

void setup() {
  Serial.begin(9600);
  s.attach(SERVO_PIN);
  s.write(0);
  delay(500);

  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  Serial.println("Arduino Ready.");
}

void loop() {
  int n = readInt();
  if (n == -999) return;

  // small debounce delay after receiving any command
  delay(100);

  // reset signals
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, LOW);
  digitalWrite(BUZZER, LOW);

  if (n >= 0 && n <= 4) {
    rotateN(n);  
  }
  else if (n == 5) {
    digitalWrite(GREEN_LED, HIGH);
    delay(500);                 // <-- added so LED remains ON briefly
  }
  else if (n == 6) {
    digitalWrite(RED_LED, HIGH);
    digitalWrite(BUZZER, HIGH);
    delay(500);                 // <-- added so buzzer + LED stay ON
  }
}
