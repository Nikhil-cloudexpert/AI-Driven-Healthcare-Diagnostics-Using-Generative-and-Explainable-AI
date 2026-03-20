const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const { protect } = require('../middleware/authMiddleware');
const HealthData = require('../models/HealthData');
const User = require('../models/User');

// Initialize Gemini Client
// We assume process.env.GEMINI_API_KEY is set
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

// Helper to get or create health data
const getHealthData = async (userId) => {
  let data = await HealthData.findOne({ user: userId });
  if (!data) {
    data = await HealthData.create({ user: userId });
  }
  return data;
};

// @route   POST /api/ai/symptom-checker
// @desc    Analyze symptoms using Gemini AI
router.post('/symptom-checker', protect, async (req, res) => {
  try {
    const { symptoms } = req.body;
    const user = req.user;

    const basePrompt = `You are an expert AI medical assistant. A patient named ${user.name} (Age: ${user.age || 'Unknown'}, Gender: ${user.gender || 'Unknown'}) is reporting the following symptoms: "${symptoms}". Provide a professional, compassionate, and structured potential diagnosis/advice. Disclaimer: You must also recommend seeing a doctor.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: basePrompt,
    });
    
    const aiDiagnosis = response.text;

    // Save to database
    const healthData = await getHealthData(req.user._id);
    healthData.symptomChecks.push({ symptoms, aiDiagnosis });
    await healthData.save();

    res.json({ diagnosis: aiDiagnosis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'AI processing failed' });
  }
});

// @route   POST /api/ai/chat
// @desc    General health twin chat
router.post('/chat', protect, async (req, res) => {
  try {
    const { message } = req.body;
    const healthData = await getHealthData(req.user._id);
    
    // Add user message to history
    healthData.aiChats.push({ role: 'user', parts: [{ text: message }] });

    // Format history for Gemini API
    const history = healthData.aiChats.map(chat => ({
      role: chat.role,
      parts: chat.parts
    }));

    // For safety, prepend system context to the first message or send as a prompt
    const promptContext = `You are Aetheria, an AI Health Twin for ${req.user.name}. Keep your responses concise, helpful, and friendly.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptContext + " Patient says: " + message,
      // In a real app we would use chat sessions, but for simplicity we rely on appending
    });

    const aiResponse = response.text;

    // Add model response to history
    healthData.aiChats.push({ role: 'model', parts: [{ text: aiResponse }] });
    await healthData.save();

    res.json({ reply: aiResponse, history: healthData.aiChats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Chat failed' });
  }
});

// @route   POST /api/ai/meal-plan
// @desc    Generate personalized meal plan
router.post('/meal-plan', protect, async (req, res) => {
  try {
    const { goal, dietaryRestrictions } = req.body;
    
    // In a full implementation, we'd include medical conditions from req.user
    const prompt = `Create a 3-day personalized meal plan for a patient with the goal: ${goal}. Dietary restrictions: ${dietaryRestrictions || 'None'}. Return formatted markdown without enclosing code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const mealPlan = response.text;
    
    const healthData = await getHealthData(req.user._id);
    healthData.mealPlans.push({ planDetails: mealPlan });
    await healthData.save();

    res.json({ mealPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Meal plan generation failed' });
  }
});

module.exports = router;
