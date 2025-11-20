# BrainBoost: A Reward-Based Learning Experience — BEP Group 46

## ⭐ *“Learning feels different when knowledge transforms into real rewards.”* ⭐

---

## ⭐ Mentor  
### **Prof. Purbasha Das**  
*DAU (formerly DAIICT)*



## 📘 Introduction

**BrainBoost** is an interactive pedagogy tool that transforms ordinary MCQ learning into a fun, gamified, and sensory experience. Instead of traditional "right/wrong" feedback on a screen, BrainBoost connects digital quizzes with real‑world rewards using hardware. When a learner answers correctly, a **green light blinks and a chocolate is dispensed** — instantly reinforcing positive learning.

## 🎯 Motivation

The current education system often struggles with engagement, especially for foundational concepts. Students learn better when:

* They receive **instant feedback**
* The experience feels **rewarding**
* Learning is **playful instead of stressful**

BrainBoost brings these three elements together using technology.

## 🌈 Theme

The theme of BrainBoost is **Reward‑Based Learning**:

* Learn → Attempt → Get Reward → Repeat.
* Inspired by psychology’s **operant conditioning** and **positive reinforcement**.
* Combines **Arduino**, **software**, and **pedagogy principles**.

## 💡 Unique Selling Points (USPs)

* **Real‑world reward system** using servo‑based chocolate dispenser.
* **Instant hardware feedback** (green LED, red LED, buzzer).
* **Smooth Arduino‑controlled servo rotation** for controlled dispensing.
* **React Frontend + Node.js Backend** for seamless MCQ flow.
* **Gamified learning** without distractions.
* **Fully customizable** MCQ bank and reward mechanisms.

## 🧠 Concepts Used

### 📌 Software

* **React** for MCQ UI
* **Node.js + Express** backend
* **Serial communication** using `serialport` library
* **State management** for progress and scoring
* **API routing** for checking answers

### 📌 Hardware

* **Arduino UNO**
* **Servo Motor** (rotates 36° × n for dispensing)
* **LEDs (Green + Red)**
* **Piezo Buzzer**
* **Jumper wires, power, breadboard**

### 📌 Pedagogy Concepts

* Positive reinforcement
* Motivation through rewards
* Multisensory learning triggers

## 📦 Workflow Overview

1. User selects subject + MCQ in frontend.
2. User answers → Sent to backend.
3. Backend validates the answer.
4. Correct answer → Arduino gets command → Servo rotates → Chocolate dispensed.
5. Wrong answer → Red LED + Buzzer.

## ⭐ Star Line (If you liked the project)

**If you believe learning should feel rewarding, give BrainBoost a ⭐ and share the joy of chocolate‑powered education!**
