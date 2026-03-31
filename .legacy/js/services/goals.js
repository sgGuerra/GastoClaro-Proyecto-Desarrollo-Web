// Servicio de metas para GastoClaro

const { Goal } = require('../data/models');

class GoalService {
  constructor(storage) {
    this.storage = storage;
  }

  getAllGoals(userId) {
    const goals = this.storage.getGoals();
    return goals.filter(g => g.userId === userId);
  }

  getGoalById(id, userId) {
    const goals = this.getAllGoals(userId);
    return goals.find(g => g.id === id);
  }

  createGoal(userId, name, targetAmount, currentAmount = 0, deadline = null, priority = 'medium') {
    if (!name || !targetAmount) {
      throw new Error('Nombre y monto objetivo son requeridos');
    }

    const goals = this.storage.getGoals();
    const newGoal = new Goal(
      Date.now(),
      userId,
      name,
      targetAmount,
      currentAmount,
      deadline,
      priority
    );

    goals.push(newGoal);
    this.storage.save('goals', goals);
    
    return { success: true, goal: newGoal };
  }

  updateGoal(id, userId, updates) {
    const goals = this.storage.getGoals();
    const goalIndex = goals.findIndex(g => g.id === id && g.userId === userId);
    
    if (goalIndex === -1) {
      throw new Error('Meta no encontrada');
    }

    goals[goalIndex] = { ...goals[goalIndex], ...updates };
    // Recalcular progreso si se actualizó el monto objetivo
    if (updates.targetAmount || updates.currentAmount) {
      goals[goalIndex].progress = (goals[goalIndex].currentAmount / goals[goalIndex].targetAmount) * 100;
    }
    this.storage.save('goals', goals);
    
    return { success: true, goal: goals[goalIndex] };
  }

  deleteGoal(id, userId) {
    const goals = this.storage.getGoals();
    const filteredGoals = goals.filter(g => g.id !== id || g.userId !== userId);
    
    if (filteredGoals.length === goals.length) {
      throw new Error('Meta no encontrada');
    }

    this.storage.save('goals', filteredGoals);
    return { success: true };
  }

  addContribution(goalId, userId, amount, date = new Date().toISOString()) {
    const goals = this.storage.getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId && g.userId === userId);
    
    if (goalIndex === -1) {
      throw new Error('Meta no encontrada');
    }

    const goal = goals[goalIndex];
    
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }

    goal.addContribution(amount, date);
    this.storage.save('goals', goals);
    
    return { success: true, goal: goals[goalIndex] };
  }

  getTotalGoals(userId) {
    const goals = this.getAllGoals(userId);
    return goals.reduce((sum, g) => sum + g.targetAmount, 0);
  }

  getCurrentSavings(userId) {
    const goals = this.getAllGoals(userId);
    return goals.reduce((sum, g) => sum + g.currentAmount, 0);
  }

  getCompletedGoals(userId) {
    const goals = this.getAllGoals(userId);
    return goals.filter(g => g.progress >= 100);
  }

  getActiveGoals(userId) {
    const goals = this.getAllGoals(userId);
    return goals.filter(g => g.progress < 100);
  }

  getGoalsByPriority(userId, priority) {
    const goals = this.getAllGoals(userId);
    return goals.filter(g => g.priority === priority);
  }

  getGoalsByDeadline(userId, startDate, endDate) {
    const goals = this.getAllGoals(userId);
    return goals.filter(g => {
      if (!g.deadline) return false;
      const deadline = new Date(g.deadline);
      return deadline >= new Date(startDate) && deadline <= new Date(endDate);
    });
  }

  getUpcomingGoalsDeadlines(userId, days = 30) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);
    
    return this.getGoalsByDeadline(userId, today.toISOString(), futureDate.toISOString());
  }

  getOverallProgress(userId) {
    const goals = this.getAllGoals(userId);
    if (goals.length === 0) return 0;
    
    const totalProgress = goals.reduce((sum, g) => sum + g.progress, 0);
    return totalProgress / goals.length;
  }
}

// Versión para navegador
class GoalServiceBrowser {
  constructor() {}

  _getUserId() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    return user.id;
  }

  getAllGoals() {
    const userId = this._getUserId();
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    return goals.filter(g => g.userId === userId);
  }

  createGoal(name, targetAmount, currentAmount = 0, deadline = null, priority = 'medium') {
    const userId = this._getUserId();
    if (!name || !targetAmount) {
      throw new Error('Nombre y monto objetivo son requeridos');
    }

    const goals = this.getAllGoals();
    const progress = (parseFloat(currentAmount) / parseFloat(targetAmount)) * 100;
    
    const newGoal = {
      id: Date.now(),
      userId,
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      deadline,
      priority,
      progress: Math.min(progress, 100),
      contributions: [],
      createdAt: new Date().toISOString()
    };

    goals.push(newGoal);
    localStorage.setItem('goals', JSON.stringify(goals));
    
    return { success: true, goal: newGoal };
  }

  updateGoal(id, updates) {
    const userId = this._getUserId();
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const goalIndex = goals.findIndex(g => g.id === id && g.userId === userId);
    
    if (goalIndex === -1) {
      throw new Error('Meta no encontrada');
    }

    goals[goalIndex] = { ...goals[goalIndex], ...updates };
    
    // Recalcular progreso
    if (updates.targetAmount || updates.currentAmount) {
      goals[goalIndex].progress = (goals[goalIndex].currentAmount / goals[goalIndex].targetAmount) * 100;
    }
    
    localStorage.setItem('goals', JSON.stringify(goals));
    
    return { success: true, goal: goals[goalIndex] };
  }

  deleteGoal(id) {
    const userId = this._getUserId();
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const filteredGoals = goals.filter(g => g.id !== id || g.userId !== userId);
    
    if (filteredGoals.length === goals.length) {
      throw new Error('Meta no encontrada');
    }

    localStorage.setItem('goals', JSON.stringify(filteredGoals));
    return { success: true };
  }

  addContribution(goalId, amount, date = new Date().toISOString()) {
    const userId = this._getUserId();
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const goalIndex = goals.findIndex(g => g.id === goalId && g.userId === userId);
    
    if (goalIndex === -1) {
      throw new Error('Meta no encontrada');
    }

    const goal = goals[goalIndex];
    
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }

    goal.contributions.push({ amount: parseFloat(amount), date });
    goal.currentAmount += parseFloat(amount);
    goal.progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    localStorage.setItem('goals', JSON.stringify(goals));
    
    return { success: true, goal: goals[goalIndex] };
  }

  getTotalGoals() {
    const goals = this.getAllGoals();
    return goals.reduce((sum, g) => sum + g.targetAmount, 0);
  }

  getCurrentSavings() {
    const goals = this.getAllGoals();
    return goals.reduce((sum, g) => sum + g.currentAmount, 0);
  }

  getCompletedGoals() {
    const goals = this.getAllGoals();
    return goals.filter(g => g.progress >= 100);
  }

  getActiveGoals() {
    const goals = this.getAllGoals();
    return goals.filter(g => g.progress < 100);
  }

  getOverallProgress() {
    const goals = this.getAllGoals();
    if (goals.length === 0) return 0;
    
    const totalProgress = goals.reduce((sum, g) => sum + g.progress, 0);
    return totalProgress / goals.length;
  }
}

// Exportar según el entorno
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GoalService };
}

if (typeof window !== 'undefined') {
  window.GoalService = GoalServiceBrowser;
}
