import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";

const app = express();
app.use(cors());
app.use(express.json());

// CHANGE THIS TO YOUR ARDUINO COM PORT
const arduino = new SerialPort({
  path: "COM4",  
  baudRate: 9600,
});

arduino.on("open", () => {
  console.log("🔌 Arduino connected");
});

// 🔥 API that frontend will call
app.post("/api/send", (req, res) => {
  const { command } = req.body;

  arduino.write(command, (err) => {
    if (err) {
      console.error("Serial Write Error:", err);
      return res.json({ success: false });
    }

    console.log("Sent to Arduino:", command);
    res.json({ success: true });
  });
});

app.listen(4000, () => {
  console.log("🚀 Backend running on http://localhost:4000");
});
