// Servicio de gastos para GastoClaro

const { Expense } = require('../data/models');

class ExpenseService {
  constructor(storage) {
    this.storage = storage;
  }

  getAllExpenses(userId) {
    const expenses = this.storage.getExpenses();
    return expenses.filter(e => e.userId === userId);
  }

  getExpenseById(id, userId) {
    const expenses = this.getAllExpenses(userId);
    return expenses.find(e => e.id === id);
  }

  createExpense(userId, description, amount, category, date, type = 'expense') {
    if (!description || !amount || !category) {
      throw new Error('Descripción, monto y categoría son requeridos');
    }

    const expenses = this.storage.getExpenses();
    const newExpense = new Expense(
      Date.now(),
      userId,
      description,
      amount,
      category,
      date,
      type
    );

    expenses.push(newExpense);
    this.storage.save('expenses', expenses);
    
    return { success: true, expense: newExpense };
  }

  updateExpense(id, userId, updates) {
    const expenses = this.storage.getExpenses();
    const expenseIndex = expenses.findIndex(e => e.id === id && e.userId === userId);
    
    if (expenseIndex === -1) {
      throw new Error('Gasto no encontrado');
    }

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...updates };
    this.storage.save('expenses', expenses);
    
    return { success: true, expense: expenses[expenseIndex] };
  }

  deleteExpense(id, userId) {
    const expenses = this.storage.getExpenses();
    const filteredExpenses = expenses.filter(e => e.id !== id || e.userId !== userId);
    
    if (filteredExpenses.length === expenses.length) {
      throw new Error('Gasto no encontrado');
    }

    this.storage.save('expenses', filteredExpenses);
    return { success: true };
  }

  getExpensesByCategory(userId, category) {
    const expenses = this.getAllExpenses(userId);
    return expenses.filter(e => e.category === category);
  }

  getExpensesByDateRange(userId, startDate, endDate) {
    const expenses = this.getAllExpenses(userId);
    return expenses.filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
    });
  }

  getTotalExpenses(userId, startDate, endDate) {
    let expenses = this.getAllExpenses(userId).filter(e => e.type === 'expense');
    
    if (startDate && endDate) {
      expenses = this.getExpensesByDateRange(userId, startDate, endDate);
      expenses = expenses.filter(e => e.type === 'expense');
    }
    
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getTotalIncome(userId, startDate, endDate) {
    let expenses = this.getAllExpenses(userId).filter(e => e.type === 'income');
    
    if (startDate && endDate) {
      expenses = this.getExpensesByDateRange(userId, startDate, endDate);
      expenses = expenses.filter(e => e.type === 'income');
    }
    
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getBalance(userId, startDate, endDate) {
    const income = this.getTotalIncome(userId, startDate, endDate);
    const expenses = this.getTotalExpenses(userId, startDate, endDate);
    return income - expenses;
  }

  getCategorySummary(userId, startDate, endDate) {
    const expenses = this.getExpensesByDateRange(userId, startDate, endDate)
      .filter(e => e.type === 'expense');
    
    const summary = {};
    expenses.forEach(e => {
      if (!summary[e.category]) {
        summary[e.category] = 0;
      }
      summary[e.category] += e.amount;
    });
    
    return summary;
  }

  getMonthlyExpenses(userId, year) {
    const monthlyData = Array(12).fill(0);
    const expenses = this.getAllExpenses(userId).filter(e => e.type === 'expense');
    
    expenses.forEach(e => {
      const expenseDate = new Date(e.date);
      if (expenseDate.getFullYear() === year) {
        monthlyData[expenseDate.getMonth()] += e.amount;
      }
    });
    
    return monthlyData;
  }
}

// Versión para navegador
class ExpenseServiceBrowser {
  constructor() {}

  _getUserId() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    return user.id;
  }

  getAllExpenses() {
    const userId = this._getUserId();
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    return expenses.filter(e => e.userId === userId);
  }

  createExpense(description, amount, category, date, type = 'expense') {
    const userId = this._getUserId();
    if (!description || !amount || !category) {
      throw new Error('Descripción, monto y categoría son requeridos');
    }

    const expenses = this.getAllExpenses();
    const newExpense = {
      id: Date.now(),
      userId,
      description,
      amount: parseFloat(amount),
      category,
      date: date || new Date().toISOString(),
      type,
      createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    return { success: true, expense: newExpense };
  }

  updateExpense(id, updates) {
    const userId = this._getUserId();
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const expenseIndex = expenses.findIndex(e => e.id === id && e.userId === userId);
    
    if (expenseIndex === -1) {
      throw new Error('Gasto no encontrado');
    }

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...updates };
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    return { success: true, expense: expenses[expenseIndex] };
  }

  deleteExpense(id) {
    const userId = this._getUserId();
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const filteredExpenses = expenses.filter(e => e.id !== id || e.userId !== userId);
    
    if (filteredExpenses.length === expenses.length) {
      throw new Error('Gasto no encontrado');
    }

    localStorage.setItem('expenses', JSON.stringify(filteredExpenses));
    return { success: true };
  }

  getTotalExpenses(startDate, endDate) {
    let expenses = this.getAllExpenses().filter(e => e.type === 'expense');
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      expenses = expenses.filter(e => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      });
    }
    
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getTotalIncome(startDate, endDate) {
    let expenses = this.getAllExpenses().filter(e => e.type === 'income');
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      expenses = expenses.filter(e => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      });
    }
    
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getBalance(startDate, endDate) {
    const income = this.getTotalIncome(startDate, endDate);
    const expenses = this.getTotalExpenses(startDate, endDate);
    return income - expenses;
  }

  getCategorySummary(startDate, endDate) {
    let expenses = this.getAllExpenses().filter(e => e.type === 'expense');
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      expenses = expenses.filter(e => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      });
    }
    
    const summary = {};
    expenses.forEach(e => {
      if (!summary[e.category]) {
        summary[e.category] = 0;
      }
      summary[e.category] += e.amount;
    });
    
    return summary;
  }

  getMonthlyExpenses(year) {
    const monthlyData = Array(12).fill(0);
    const expenses = this.getAllExpenses().filter(e => e.type === 'expense');
    
    expenses.forEach(e => {
      const expenseDate = new Date(e.date);
      if (expenseDate.getFullYear() === year) {
        monthlyData[expenseDate.getMonth()] += e.amount;
      }
    });
    
    return monthlyData;
  }
}

// Exportar según el entorno
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExpenseService };
}

if (typeof window !== 'undefined') {
  window.ExpenseService = ExpenseServiceBrowser;
}
