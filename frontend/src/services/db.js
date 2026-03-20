// API Service connecting the Frontend to the Express Backend
const API_URL = 'http://localhost:5000/api';

export const db = {
  getAuthToken: () => {
    return localStorage.getItem('aetheria_token') || null;
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('aetheria_current_user') || 'null');
  },

  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('aetheria_token', data.token);
    localStorage.setItem('aetheria_current_user', JSON.stringify(data));
    return data;
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('aetheria_token', data.token);
    localStorage.setItem('aetheria_current_user', JSON.stringify(data));
    return data;
  },

  logout: async () => {
    localStorage.removeItem('aetheria_token');
    localStorage.removeItem('aetheria_current_user');
  },

  symptomCheck: async (symptoms) => {
    const res = await fetch(`${API_URL}/ai/symptom-checker`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${db.getAuthToken()}`,
      },
      body: JSON.stringify({ symptoms }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error communicating with AI');
    return data;
  },

  chat: async (message) => {
    const res = await fetch(`${API_URL}/ai/chat`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${db.getAuthToken()}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error communicating with AI');
    return data;
  },

  generateMealPlan: async (goal, restrictions) => {
    const res = await fetch(`${API_URL}/ai/meal-plan`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${db.getAuthToken()}`,
      },
      body: JSON.stringify({ goal, dietaryRestrictions: restrictions }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error communicating with AI');
    return data;
  }
};
