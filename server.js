const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SAKINA AI is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "API key is not configured." });
    }

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(req.body.message || "");
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI response failed. Please try again." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SAKINA AI running on port ${PORT}`));
