import React, { useState } from 'react';
import { Apple, Dumbbell, Flame, Target, Utensils, Wheat, Loader2 } from 'lucide-react';
import { db } from '../services/db';
import './Nutrition.css';
import ReactMarkdown from 'react-markdown';

export default function Nutrition() {
  const [goal, setGoal] = useState('Maintain Muscle, Lower BP');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('Low Sodium');
  const [mealPlan, setMealPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const data = await db.generateMealPlan(goal, dietaryRestrictions);
      setMealPlan(data.mealPlan);
    } catch (err) {
      console.error(err);
      setMealPlan('Error generating meal plan. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="nutrition animate-fade-in">
      <div className="nutrition-header">
        <h1>AI Nutrition & Fitness Coach</h1>
        <p>Dynamic plans based on your health profile and local availability.</p>
      </div>

      <div className="grid-3 mt-4">
        {/* Goals & Macros */}
        <div className="card macro-card">
          <div className="card-header">
             <h3><Target size={18}/> Active Goals</h3>
             <span className="badge badge-primary">Maintain Muscle, Lower BP</span>
          </div>

          <div className="macro-rings mt-4">
             <div className="macro-circle protein">
                <span className="macro-val">80g</span>
                <span className="macro-label">Protein</span>
             </div>
             <div className="macro-circle carbs">
                <span className="macro-val">120g</span>
                <span className="macro-label">Carbs</span>
             </div>
             <div className="macro-circle fat">
                <span className="macro-val">45g</span>
                <span className="macro-label">Fat</span>
             </div>
          </div>
          
          <div className="calories mt-4 text-center">
             <h2>1,450 / 1,800 kcal</h2>
             <p>Remaining: 350 kcal</p>
          </div>
        </div>

        {/* Local Diet Plan (AI Generated) */}
        <div className="card diet-card">
          <div className="card-header">
             <h3><Utensils size={18}/> AI Meal Plan Generator</h3>
          </div>
          
          <div className="meal-inputs mb-3 mt-3">
             <input type="text" className="input-base mb-2 w-full" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Fitness Goal" />
             <input type="text" className="input-base mb-2 w-full" value={dietaryRestrictions} onChange={e => setDietaryRestrictions(e.target.value)} placeholder="Dietary Restrictions" />
             <button className="btn btn-primary w-full" onClick={handleGeneratePlan} disabled={loading}>
               {loading ? <Loader2 className="spin" size={16} /> : 'Generate Plan'}
             </button>
          </div>

          <div className="meal-list mt-3">
             {mealPlan ? (
               <div className="ai-generated-plan" style={{ fontSize: '0.9rem' }}>
                 <ReactMarkdown>
                   {mealPlan}
                 </ReactMarkdown>
               </div>
             ) : (
               <p className="text-muted text-center" style={{ padding: '2rem 0' }}>Click "Generate Plan" to get your personalized AI meal structure.</p>
             )}
          </div>
        </div>

        {/* Fitness Tracker */}
        <div className="card fitness-card">
           <div className="card-header">
              <h3><Dumbbell size={18}/> Activity Stream</h3>
           </div>
           
           <div className="activity-stats mt-3">
              <div className="activity-stat">
                 <Flame size={20} className="text-warning"/>
                 <div className="stat-text">
                    <span className="val">450</span>
                    <span className="lbl">Active kcal</span>
                 </div>
              </div>
           </div>

           <div className="workout-plan mt-4">
              <h4>Suggested Evening Workout</h4>
              <p className="text-sm">Based on your sleep score today, a light mobility routine is recommended over HIIT.</p>
              
              <div className="workout-card mt-2">
                 <div className="workout-img video-placeholder">
                   <Dumbbell size={24} color="gray"/>
                 </div>
                 <div className="workout-info">
                    <strong>15-Min Yoga / Stretching</strong>
                    <span>Focus on lower back tension.</span>
                    <button className="btn btn-outline btn-sm mt-2">Start Routine</button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
