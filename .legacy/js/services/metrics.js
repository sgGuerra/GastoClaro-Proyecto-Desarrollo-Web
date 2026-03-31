// Servicio de métricas para GastoClaro

const { Metric } = require('../data/models');

class MetricsService {
  constructor(storage, expenseService, debtService, goalService) {
    this.storage = storage;
    this.expenseService = expenseService;
    this.debtService = debtService;
    this.goalService = goalService;
  }

  calculateFinancialHealth(userId) {
    const income = this.expenseService.getTotalIncome(userId);
    const expenses = this.expenseService.getTotalExpenses(userId);
    const totalDebts = this.debtService.getTotalDebts(userId);
    const savings = this.goalService.getCurrentSavings(userId);
    
    // Calcular ratio de ahorro
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    
    // Calcular ratio deuda/ingreso
    const debtToIncome = income > 0 ? (totalDebts / income) * 100 : 0;
    
    // Calcular balance
    const balance = income - expenses;
    
    // Score de salud financiera (0-100)
    let healthScore = 50; // Base
    
    // Bonus por balance positivo
    if (balance > 0) {
      healthScore += Math.min(20, (balance / income) * 100);
    } else {
      healthScore -= Math.min(20, Math.abs(balance / income) * 100);
    }
    
    // Penalización por alta deuda
    if (debtToIncome > 50) {
      healthScore -= 20;
    } else if (debtToIncome > 30) {
      healthScore -= 10;
    }
    
    // Bonus por ahorro
    if (savingsRate > 20) {
      healthScore += 15;
    } else if (savingsRate > 10) {
      healthScore += 10;
    }
    
    return Math.max(0, Math.min(100, healthScore));
  }

  getDashboardMetrics(userId) {
    const income = this.expenseService.getTotalIncome(userId);
    const expenses = this.expenseService.getTotalExpenses(userId);
    const balance = income - expenses;
    const totalDebts = this.debtService.getTotalDebts(userId);
    const totalGoals = this.goalService.getTotalGoals(userId);
    const currentSavings = this.goalService.getCurrentSavings(userId);
    const goalsProgress = this.goalService.getOverallProgress(userId);
    const financialHealth = this.calculateFinancialHealth(userId);
    
    const metric = new Metric(userId);
    metric.totalExpenses = expenses;
    metric.totalIncome = income;
    metric.balance = balance;
    metric.totalDebts = totalDebts;
    metric.totalGoals = totalGoals;
    metric.goalsProgress = goalsProgress;
    metric.financialHealth = financialHealth;
    
    return metric;
  }

  getMonthlyTrend(userId, year) {
    const monthlyData = [];
    
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1).toISOString();
      const endDate = new Date(year, month + 1, 0).toISOString();
      
      const income = this.expenseService.getTotalIncome(userId, startDate, endDate);
      const expenses = this.expenseService.getTotalExpenses(userId, startDate, endDate);
      const balance = income - expenses;
      
      monthlyData.push({
        month: month + 1,
        monthName: new Date(year, month).toLocaleString('es-ES', { month: 'long' }),
        income,
        expenses,
        balance
      });
    }
    
    return monthlyData;
  }

  getCategoryBreakdown(userId, startDate, endDate) {
    const summary = this.expenseService.getCategorySummary(userId, startDate, endDate);
    const total = Object.values(summary).reduce((sum, val) => sum + val, 0);
    
    const breakdown = Object.entries(summary).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0
    }));
    
    return breakdown.sort((a, b) => b.amount - a.amount);
  }

  getDebtAnalysis(userId) {
    const debts = this.debtService.getAllDebts(userId);
    const totalDebt = this.debtService.getTotalDebts(userId);
    const pendingDebts = this.debtService.getPendingDebts(userId);
    const paidDebts = this.debtService.getPaidDebts(userId);
    
    const averageInterestRate = debts.length > 0 
      ? debts.reduce((sum, d) => sum + d.interestRate, 0) / debts.length 
      : 0;
    
    const highInterestDebts = this.debtService.getDebtsWithHighInterest(userId);
    
    return {
      totalDebt,
      pendingCount: pendingDebts.length,
      paidCount: paidDebts.length,
      averageInterestRate,
      highInterestDebtsCount: highInterestDebts.length,
      debtsByCreditor: debts.map(d => ({
        creditor: d.creditor,
        amount: d.amount,
        interestRate: d.interestRate,
        status: d.status
      }))
    };
  }

  getGoalsAnalysis(userId) {
    const goals = this.goalService.getAllGoals(userId);
    const completed = this.goalService.getCompletedGoals(userId);
    const active = this.goalService.getActiveGoals(userId);
    const totalTarget = this.goalService.getTotalGoals(userId);
    const currentSavings = this.goalService.getCurrentSavings(userId);
    const overallProgress = this.goalService.getOverallProgress(userId);
    
    return {
      totalGoals: goals.length,
      completedCount: completed.length,
      activeCount: active.length,
      totalTarget,
      currentSavings,
      overallProgress,
      completionRate: goals.length > 0 ? (completed.length / goals.length) * 100 : 0,
      goalsByPriority: {
        high: this.goalService.getGoalsByPriority(userId, 'high').length,
        medium: this.goalService.getGoalsByPriority(userId, 'medium').length,
        low: this.goalService.getGoalsByPriority(userId, 'low').length
      }
    };
  }

  getRecommendations(userId) {
    const recommendations = [];
    const metrics = this.getDashboardMetrics(userId);
    const debtAnalysis = this.getDebtAnalysis(userId);
    
    // Recomendaciones basadas en salud financiera
    if (metrics.financialHealth < 40) {
      recommendations.push({
        type: 'warning',
        title: 'Salud Financiera Baja',
        message: 'Considera revisar tus gastos y crear un presupuesto más estricto.'
      });
    }
    
    if (metrics.balance < 0) {
      recommendations.push({
        type: 'critical',
        title: 'Balance Negativo',
        message: 'Tus gastos superan tus ingresos. Busca formas de reducir gastos o aumentar ingresos.'
      });
    }
    
    if (debtAnalysis.highInterestDebtsCount > 0) {
      recommendations.push({
        type: 'warning',
        title: 'Deudas con Alto Interés',
        message: `Tienes ${debtAnalysis.highInterestDebtsCount} deudas con interés alto. Prioriza pagarlas primero.`
      });
    }
    
    if (metrics.totalDebts > metrics.totalIncome * 0.5) {
      recommendations.push({
        type: 'info',
        title: 'Alto Nivel de Deuda',
        message: 'Tus deudas representan más del 50% de tus ingresos. Considera un plan de pago agresivo.'
      });
    }
    
    if (metrics.goalsProgress < 30 && metrics.balance > 0) {
      recommendations.push({
        type: 'info',
        title: 'Progreso de Metas Bajo',
        message: 'Podrías destinar más fondos a tus metas financieras.'
      });
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        title: '¡Excelente!',
        message: 'Tu situación financiera se ve saludable. ¡Sigue así!'
      });
    }
    
    return recommendations;
  }
}

// Versión para navegador
class MetricsServiceBrowser {
  constructor() {}

  _getUserId() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    return user.id;
  }

  calculateFinancialHealth() {
    const userId = this._getUserId();
    const expenseService = new window.ExpenseService();
    const debtService = new window.DebtService();
    const goalService = new window.GoalService();
    
    const income = expenseService.getTotalIncome();
    const expenses = expenseService.getTotalExpenses();
    const totalDebts = debtService.getTotalDebts();
    const savings = goalService.getCurrentSavings();
    
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const debtToIncome = income > 0 ? (totalDebts / income) * 100 : 0;
    const balance = income - expenses;
    
    let healthScore = 50;
    
    if (balance > 0) {
      healthScore += Math.min(20, (balance / income) * 100);
    } else {
      healthScore -= Math.min(20, Math.abs(balance / income) * 100);
    }
    
    if (debtToIncome > 50) {
      healthScore -= 20;
    } else if (debtToIncome > 30) {
      healthScore -= 10;
    }
    
    if (savingsRate > 20) {
      healthScore += 15;
    } else if (savingsRate > 10) {
      healthScore += 10;
    }
    
    return Math.max(0, Math.min(100, healthScore));
  }

  getDashboardMetrics() {
    const expenseService = new window.ExpenseService();
    const debtService = new window.DebtService();
    const goalService = new window.GoalService();
    
    const income = expenseService.getTotalIncome();
    const expenses = expenseService.getTotalExpenses();
    const balance = income - expenses;
    const totalDebts = debtService.getTotalDebts();
    const totalGoals = goalService.getTotalGoals();
    const currentSavings = goalService.getCurrentSavings();
    const goalsProgress = goalService.getOverallProgress();
    const financialHealth = this.calculateFinancialHealth();
    
    return {
      totalExpenses: expenses,
      totalIncome: income,
      balance,
      totalDebts,
      totalGoals,
      goalsProgress,
      financialHealth,
      calculatedAt: new Date().toISOString()
    };
  }

  getCategoryBreakdown(startDate, endDate) {
    const expenseService = new window.ExpenseService();
    const summary = expenseService.getCategorySummary(startDate, endDate);
    const total = Object.values(summary).reduce((sum, val) => sum + val, 0);
    
    return Object.entries(summary).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);
  }

  getMonthlyTrend(year) {
    const expenseService = new window.ExpenseService();
    const monthlyData = [];
    
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1).toISOString();
      const endDate = new Date(year, month + 1, 0).toISOString();
      
      const income = expenseService.getTotalIncome(startDate, endDate);
      const expenses = expenseService.getTotalExpenses(startDate, endDate);
      const balance = income - expenses;
      
      monthlyData.push({
        month: month + 1,
        monthName: new Date(year, month).toLocaleString('es-ES', { month: 'long' }),
        income,
        expenses,
        balance
      });
    }
    
    return monthlyData;
  }

  getRecommendations() {
    const recommendations = [];
    const metrics = this.getDashboardMetrics();
    
    if (metrics.financialHealth < 40) {
      recommendations.push({
        type: 'warning',
        title: 'Salud Financiera Baja',
        message: 'Considera revisar tus gastos y crear un presupuesto más estricto.'
      });
    }
    
    if (metrics.balance < 0) {
      recommendations.push({
        type: 'critical',
        title: 'Balance Negativo',
        message: 'Tus gastos superan tus ingresos. Busca formas de reducir gastos o aumentar ingresos.'
      });
    }
    
    if (metrics.totalDebts > metrics.totalIncome * 0.5) {
      recommendations.push({
        type: 'info',
        title: 'Alto Nivel de Deuda',
        message: 'Tus deudas representan más del 50% de tus ingresos. Considera un plan de pago agresivo.'
      });
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        title: '¡Excelente!',
        message: 'Tu situación financiera se ve saludable. ¡Sigue así!'
      });
    }
    
    return recommendations;
  }
}

// Exportar según el entorno
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MetricsService };
}

if (typeof window !== 'undefined') {
  window.MetricsService = MetricsServiceBrowser;
}
