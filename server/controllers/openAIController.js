import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getRecommendations = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const prompt = `List 5 popular tourist attractions in ${city}, each with a short one-sentence description. Format it as a JSON array of objects with name and description.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    const data = JSON.parse(content);
    res.json(data);
  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ message: 'Failed to get recommendations' });
  }
};

export {
    getRecommendations
}