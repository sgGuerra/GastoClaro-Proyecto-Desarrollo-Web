// Servicio de deudas para GastoClaro

const { Debt } = require('../data/models');

class DebtService {
  constructor(storage) {
    this.storage = storage;
  }

  getAllDebts(userId) {
    const debts = this.storage.getDebts();
    return debts.filter(d => d.userId === userId);
  }

  getDebtById(id, userId) {
    const debts = this.getAllDebts(userId);
    return debts.find(d => d.id === id);
  }

  createDebt(userId, creditor, amount, totalAmount, dueDate, interestRate = 0) {
    if (!creditor || !amount || !dueDate) {
      throw new Error('Acreedor, monto y fecha de vencimiento son requeridos');
    }

    const debts = this.storage.getDebts();
    const newDebt = new Debt(
      Date.now(),
      userId,
      creditor,
      amount,
      totalAmount || amount,
      dueDate,
      interestRate
    );

    debts.push(newDebt);
    this.storage.save('debts', debts);
    
    return { success: true, debt: newDebt };
  }

  updateDebt(id, userId, updates) {
    const debts = this.storage.getDebts();
    const debtIndex = debts.findIndex(d => d.id === id && d.userId === userId);
    
    if (debtIndex === -1) {
      throw new Error('Deuda no encontrada');
    }

    debts[debtIndex] = { ...debts[debtIndex], ...updates };
    this.storage.save('debts', debts);
    
    return { success: true, debt: debts[debtIndex] };
  }

  deleteDebt(id, userId) {
    const debts = this.storage.getDebts();
    const filteredDebts = debts.filter(d => d.id !== id || d.userId !== userId);
    
    if (filteredDebts.length === debts.length) {
      throw new Error('Deuda no encontrada');
    }

    this.storage.save('debts', filteredDebts);
    return { success: true };
  }

  addPayment(debtId, userId, amount, date = new Date().toISOString()) {
    const debts = this.storage.getDebts();
    const debtIndex = debts.findIndex(d => d.id === debtId && d.userId === userId);
    
    if (debtIndex === -1) {
      throw new Error('Deuda no encontrada');
    }

    const debt = debts[debtIndex];
    
    if (amount <= 0) {
      throw new Error('El monto del pago debe ser mayor a 0');
    }

    if (amount > debt.amount) {
      throw new Error('El monto del pago excede el saldo pendiente');
    }

    debt.addPayment(amount, date);
    this.storage.save('debts', debts);
    
    return { success: true, debt: debts[debtIndex] };
  }

  getTotalDebts(userId) {
    const debts = this.getAllDebts(userId);
    return debts.reduce((sum, d) => sum + d.amount, 0);
  }

  getPendingDebts(userId) {
    const debts = this.getAllDebts(userId);
    return debts.filter(d => d.status === 'pending' || d.status === 'partial');
  }

  getPaidDebts(userId) {
    const debts = this.getAllDebts(userId);
    return debts.filter(d => d.status === 'paid');
  }

  getDebtsByDueDate(userId, startDate, endDate) {
    const debts = this.getAllDebts(userId);
    return debts.filter(d => {
      const dueDate = new Date(d.dueDate);
      return dueDate >= new Date(startDate) && dueDate <= new Date(endDate);
    });
  }

  getUpcomingDebts(userId, days = 30) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);
    
    return this.getDebtsByDueDate(userId, today.toISOString(), futureDate.toISOString());
  }

  getDebtsWithHighInterest(userId, minRate = 15) {
    const debts = this.getAllDebts(userId);
    return debts.filter(d => d.interestRate >= minRate);
  }
}

// Versión para navegador
class DebtServiceBrowser {
  constructor() {}

  _getUserId() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    return user.id;
  }

  getAllDebts() {
    const userId = this._getUserId();
    const debts = JSON.parse(localStorage.getItem('debts') || '[]');
    return debts.filter(d => d.userId === userId);
  }

  createDebt(creditor, amount, totalAmount, dueDate, interestRate = 0) {
    const userId = this._getUserId();
    if (!creditor || !amount || !dueDate) {
      throw new Error('Acreedor, monto y fecha de vencimiento son requeridos');
    }

    const debts = this.getAllDebts();
    const newDebt = {
      id: Date.now(),
      userId,
      creditor,
      amount: parseFloat(amount),
      totalAmount: parseFloat(totalAmount || amount),
      dueDate,
      interestRate: parseFloat(interestRate),
      status: 'pending',
      payments: [],
      createdAt: new Date().toISOString()
    };

    debts.push(newDebt);
    localStorage.setItem('debts', JSON.stringify(debts));
    
    return { success: true, debt: newDebt };
  }

  updateDebt(id, updates) {
    const userId = this._getUserId();
    const debts = JSON.parse(localStorage.getItem('debts') || '[]');
    const debtIndex = debts.findIndex(d => d.id === id && d.userId === userId);
    
    if (debtIndex === -1) {
      throw new Error('Deuda no encontrada');
    }

    debts[debtIndex] = { ...debts[debtIndex], ...updates };
    localStorage.setItem('debts', JSON.stringify(debts));
    
    return { success: true, debt: debts[debtIndex] };
  }

  deleteDebt(id) {
    const userId = this._getUserId();
    const debts = JSON.parse(localStorage.getItem('debts') || '[]');
    const filteredDebts = debts.filter(d => d.id !== id || d.userId !== userId);
    
    if (filteredDebts.length === debts.length) {
      throw new Error('Deuda no encontrada');
    }

    localStorage.setItem('debts', JSON.stringify(filteredDebts));
    return { success: true };
  }

  addPayment(debtId, amount, date = new Date().toISOString()) {
    const userId = this._getUserId();
    const debts = JSON.parse(localStorage.getItem('debts') || '[]');
    const debtIndex = debts.findIndex(d => d.id === debtId && d.userId === userId);
    
    if (debtIndex === -1) {
      throw new Error('Deuda no encontrada');
    }

    const debt = debts[debtIndex];
    
    if (amount <= 0) {
      throw new Error('El monto del pago debe ser mayor a 0');
    }

    if (amount > debt.amount) {
      throw new Error('El monto del pago excede el saldo pendiente');
    }

    debt.payments.push({ amount: parseFloat(amount), date });
    debt.amount -= parseFloat(amount);
    
    if (debt.amount <= 0) {
      debt.status = 'paid';
      debt.amount = 0;
    } else {
      debt.status = 'partial';
    }

    localStorage.setItem('debts', JSON.stringify(debts));
    
    return { success: true, debt: debts[debtIndex] };
  }

  getTotalDebts() {
    const debts = this.getAllDebts();
    return debts.reduce((sum, d) => sum + d.amount, 0);
  }

  getPendingDebts() {
    const debts = this.getAllDebts();
    return debts.filter(d => d.status === 'pending' || d.status === 'partial');
  }

  getPaidDebts() {
    const debts = this.getAllDebts();
    return debts.filter(d => d.status === 'paid');
  }

  getUpcomingDebts(days = 30) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);
    
    const debts = this.getAllDebts();
    return debts.filter(d => {
      const dueDate = new Date(d.dueDate);
      return dueDate >= today && dueDate <= futureDate;
    });
  }
}

// Exportar según el entorno
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DebtService };
}

if (typeof window !== 'undefined') {
  window.DebtService = DebtServiceBrowser;
}
