const express = require("express");
const app = express();
const PORT = 3000;

// serve all static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
