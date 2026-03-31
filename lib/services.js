'use client';

// Lógica de modelos y servicios unificada para Next.js (Client Side)

const isBrowser = typeof window !== 'undefined';

export class AuthService {
  constructor() {
    this.CURRENT_USER_KEY = 'currentUser';
  }

  register(username, email, password) {
    if (!isBrowser) return { success: false };
    if (!username || !email || !password) throw new Error('Todos los campos son requeridos');
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error('El usuario o email ya está registrado');
    }

    const newUser = { id: Date.now(), username, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
  }

  login(username, password) {
    if (!isBrowser) return { success: false };
    if (!username || !password) throw new Error('Usuario y contraseña son requeridos');

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

    if (!user) throw new Error('Credenciales inválidas');

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  logout() {
    if (isBrowser) localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true };
  }

  getCurrentUser() {
    if (!isBrowser) return null;
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }
}

export class ExpenseService {
  _getUserId() {
    if (!isBrowser) return null;
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user ? user.id : null;
  }

  getAllExpenses() {
    if (!isBrowser) return [];
    const userId = this._getUserId();
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    return expenses.filter(e => e.userId === userId);
  }

  createExpense(description, amount, category, date, type = 'expense') {
    const userId = this._getUserId();
    if (!description || !amount || !category) throw new Error('Descripción, monto y categoría son requeridos');
    
    const expenses = this.getAllExpenses(); // from all or just user's? The legacy code used global array.
    const allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    const newExpense = {
      id: Date.now(), userId, description, amount: parseFloat(amount), category,
      date: date || new Date().toISOString(), type, createdAt: new Date().toISOString()
    };

    allExpenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(allExpenses));
    return { success: true, expense: newExpense };
  }

  deleteExpense(id) {
    const userId = this._getUserId();
    if (!userId) return;
    let allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const initialLen = allExpenses.length;
    allExpenses = allExpenses.filter(e => !(e.id === id && e.userId === userId));
    if (initialLen !== allExpenses.length) {
      localStorage.setItem('expenses', JSON.stringify(allExpenses));
      return { success: true };
    }
    throw new Error('Gasto no encontrado');
  }

  getMetrics() {
    const expenses = this.getAllExpenses();
    let totalIncome = 0;
    let totalExpense = 0;
    expenses.forEach(e => {
      if (e.type === 'income') totalIncome += e.amount;
      else totalExpense += e.amount;
    });
    return { income: totalIncome, expense: totalExpense, balance: totalIncome - totalExpense };
  }

  getCategorySummary() {
    const expenses = this.getAllExpenses().filter(e => e.type === 'expense');
    const summary = {};
    expenses.forEach(e => {
      summary[e.category] = (summary[e.category] || 0) + e.amount;
    });
    return summary;
  }
}

// Similar wrappers could be added for Debt and Goals, keeping it minimal here for the core dashboard MVP functionality
