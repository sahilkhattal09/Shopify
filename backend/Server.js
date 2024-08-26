const express = require("express");
const PORT = 5000;
const app = express();

app.get("/test", (req, res) => {
  res.json({ ok: true });
});
app.listen(PORT, () => console.log(`server is now working on port ${PORT}`));
