// Consider using env vars for security

exports.gemini = async (req, res) => {
  try {
    const updatedHistory = req.body.history;
    const contents = updatedHistory.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();
    console.log("data          ", data);
    const geminiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "(No response Model Might Be Busy Please Wait)";
    res.json({ text: geminiText });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to fetch from Gemini API" });
  }
};
