// Modelos de datos para GastoClaro

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toISOString();
  }
}

class Expense {
  constructor(id, userId, description, amount, category, date, type = 'expense') {
    this.id = id;
    this.userId = userId;
    this.description = description;
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = date || new Date().toISOString();
    this.type = type; // 'expense' or 'income'
    this.createdAt = new Date().toISOString();
  }
}

class Debt {
  constructor(id, userId, creditor, amount, totalAmount, dueDate, interestRate = 0, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.creditor = creditor;
    this.amount = parseFloat(amount); // Amount remaining
    this.totalAmount = parseFloat(totalAmount); // Original amount
    this.dueDate = dueDate;
    this.interestRate = parseFloat(interestRate);
    this.status = status; // 'pending', 'paid', 'partial'
    this.payments = [];
    this.createdAt = new Date().toISOString();
  }

  addPayment(amount, date = new Date().toISOString()) {
    this.payments.push({ amount: parseFloat(amount), date });
    this.amount -= parseFloat(amount);
    if (this.amount <= 0) {
      this.status = 'paid';
      this.amount = 0;
    } else {
      this.status = 'partial';
    }
  }
}

class Goal {
  constructor(id, userId, name, targetAmount, currentAmount = 0, deadline = null, priority = 'medium') {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.targetAmount = parseFloat(targetAmount);
    this.currentAmount = parseFloat(currentAmount);
    this.deadline = deadline;
    this.priority = priority; // 'low', 'medium', 'high'
    this.progress = this.calculateProgress();
    this.contributions = [];
    this.createdAt = new Date().toISOString();
  }

  calculateProgress() {
    this.progress = (this.currentAmount / this.targetAmount) * 100;
    return Math.min(this.progress, 100);
  }

  addContribution(amount, date = new Date().toISOString()) {
    this.contributions.push({ amount: parseFloat(amount), date });
    this.currentAmount += parseFloat(amount);
    this.calculateProgress();
  }
}

class Metric {
  constructor(userId) {
    this.userId = userId;
    this.totalExpenses = 0;
    this.totalIncome = 0;
    this.balance = 0;
    this.totalDebts = 0;
    this.totalGoals = 0;
    this.goalsProgress = 0;
    this.financialHealth = 0;
    this.calculatedAt = new Date().toISOString();
  }
}

module.exports = { User, Expense, Debt, Goal, Metric };
