require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
    const userPrompt = req.body.prompt;

    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
        {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: userPrompt }]
                }
            ]
        }
    );

    const textReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Нет ответа';
    res.json({ reply: textReply });
}); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});