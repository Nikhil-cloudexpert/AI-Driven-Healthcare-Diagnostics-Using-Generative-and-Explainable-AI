const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  aiChats: [
    {
      role: { type: String, enum: ['user', 'model'], required: true },
      parts: [{ text: { type: String, required: true } }],
      timestamp: { type: Date, default: Date.now }
    }
  ],
  symptomChecks: [
    {
      symptoms: String,
      aiDiagnosis: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  mealPlans: [
    {
      planDetails: String,
      generatedAt: { type: Date, default: Date.now }
    }
  ],
  vitals: [
    {
      heartRate: Number,
      bloodPressure: String,
      temperature: Number,
      oxygenLevel: Number,
      recordedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('HealthData', healthDataSchema);
