// UI del Dashboard para GastoClaro

class DashboardUI {
  constructor() {
    this.auth = new window.AuthService();
    this.expenseService = new window.ExpenseService();
    this.debtService = new window.DebtService();
    this.goalService = new window.GoalService();
    this.metricsService = new window.MetricsService();
  }

  init() {
    if (!this.auth.isAuthenticated()) {
      window.location.href = 'index.html';
      return;
    }

    this.setupEventListeners();
    this.loadDashboard();
    this.updateUserInfo();
  }

  setupEventListeners() {
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());

    // Forms
    document.getElementById('expenseForm')?.addEventListener('submit', (e) => this.handleAddExpense(e));
    document.getElementById('debtForm')?.addEventListener('submit', (e) => this.handleAddDebt(e));
    document.getElementById('goalForm')?.addEventListener('submit', (e) => this.handleAddGoal(e));
    document.getElementById('paymentForm')?.addEventListener('submit', (e) => this.handleAddPayment(e));
    document.getElementById('contributionForm')?.addEventListener('submit', (e) => this.handleAddContribution(e));

    // Navigation tabs
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Refresh button
    document.getElementById('refreshBtn')?.addEventListener('click', () => this.loadDashboard());
  }

  handleLogout() {
    this.auth.logout();
    window.location.href = 'index.html';
  }

  updateUserInfo() {
    const user = this.auth.getCurrentUser();
    if (user) {
      document.getElementById('userName')?.textContent = user.username;
      document.getElementById('userEmail')?.textContent = user.email;
    }
  }

  async loadDashboard() {
    try {
      await this.loadMetrics();
      await this.loadExpensesList();
      await this.loadDebtsList();
      await this.loadGoalsList();
      await this.renderCharts();
    } catch (error) {
      console.error('Error loading dashboard:', error);
      this.showError('Error cargando el dashboard');
    }
  }

  async loadMetrics() {
    const metrics = this.metricsService.getDashboardMetrics();
    const recommendations = this.metricsService.getRecommendations();

    // Update metric cards
    this.updateCardValue('totalIncome', metrics.totalIncome);
    this.updateCardValue('totalExpenses', metrics.totalExpenses);
    this.updateCardValue('balance', metrics.balance);
    this.updateCardValue('totalDebts', metrics.totalDebts);
    this.updateCardValue('goalsProgress', metrics.goalsProgress.toFixed(1) + '%');

    // Financial health gauge
    this.updateFinancialHealth(metrics.financialHealth);

    // Recommendations
    this.renderRecommendations(recommendations);
  }

  updateCardValue(cardId, value) {
    const element = document.getElementById(cardId);
    if (element) {
      element.textContent = typeof value === 'number' 
        ? `$${value.toFixed(2)}` 
        : value;
    }
  }

  updateFinancialHealth(score) {
    const gauge = document.getElementById('healthGauge');
    const label = document.getElementById('healthScore');
    
    if (gauge && label) {
      label.textContent = Math.round(score);
      
      // Color based on score
      let color = '#ef4444'; // red
      if (score >= 70) color = '#22c55e'; // green
      else if (score >= 40) color = '#eab308'; // yellow
      
      gauge.style.background = `conic-gradient(${color} ${score}%, #e5e7eb ${score}%)`;
    }
  }

  renderRecommendations(recommendations) {
    const container = document.getElementById('recommendationsList');
    if (!container) return;

    container.innerHTML = recommendations.map(rec => `
      <div class="recommendation-item recommendation-${rec.type}">
        <strong>${rec.title}</strong>
        <p>${rec.message}</p>
      </div>
    `).join('');
  }

  async loadExpensesList() {
    const expenses = this.expenseService.getAllExpenses();
    const container = document.getElementById('expensesList');
    
    if (!container) return;

    if (expenses.length === 0) {
      container.innerHTML = '<p class="empty-message">No hay gastos registrados</p>';
      return;
    }

    const recentExpenses = expenses.slice(-10).reverse();
    
    container.innerHTML = recentExpenses.map(expense => `
      <div class="list-item expense-item">
        <div class="item-info">
          <span class="item-name">${expense.description}</span>
          <span class="item-category">${expense.category}</span>
        </div>
        <div class="item-amount ${expense.type === 'income' ? 'income' : 'expense'}">
          ${expense.type === 'income' ? '+' : '-'}$${expense.amount.toFixed(2)}
        </div>
        <button class="btn-delete" onclick="dashboard.deleteExpense(${expense.id})">×</button>
      </div>
    `).join('');
  }

  async loadDebtsList() {
    const debts = this.debtService.getAllDebts();
    const container = document.getElementById('debtsList');
    
    if (!container) return;

    if (debts.length === 0) {
      container.innerHTML = '<p class="empty-message">No hay deudas registradas</p>';
      return;
    }

    container.innerHTML = debts.map(debt => `
      <div class="list-item debt-item">
        <div class="item-info">
          <span class="item-name">${debt.creditor}</span>
          <span class="item-category">Interés: ${debt.interestRate}%</span>
        </div>
        <div class="item-details">
          <div class="debt-progress">
            <div class="progress-bar" style="width: ${(1 - debt.amount / debt.totalAmount) * 100}%"></div>
          </div>
          <span>$${debt.amount.toFixed(2)} / $${debt.totalAmount.toFixed(2)}</span>
        </div>
        <button class="btn-pay" onclick="dashboard.openPaymentModal(${debt.id})">Pagar</button>
      </div>
    `).join('');
  }

  async loadGoalsList() {
    const goals = this.goalService.getAllGoals();
    const container = document.getElementById('goalsList');
    
    if (!container) return;

    if (goals.length === 0) {
      container.innerHTML = '<p class="empty-message">No hay metas registradas</p>';
      return;
    }

    container.innerHTML = goals.map(goal => `
      <div class="list-item goal-item">
        <div class="item-info">
          <span class="item-name">${goal.name}</span>
          <span class="item-category">Prioridad: ${goal.priority}</span>
        </div>
        <div class="item-details">
          <div class="goal-progress">
            <div class="progress-bar" style="width: ${goal.progress}%"></div>
          </div>
          <span>${goal.progress.toFixed(1)}% ($${goal.currentAmount.toFixed(2)} / $${goal.targetAmount.toFixed(2)})</span>
        </div>
        <button class="btn-contribute" onclick="dashboard.openContributionModal(${goal.id})">Aportar</button>
      </div>
    `).join('');
  }

  async renderCharts() {
    // Monthly trend chart
    const monthlyData = this.metricsService.getMonthlyTrend(new Date().getFullYear());
    this.renderMonthlyChart(monthlyData);

    // Category breakdown
    const categoryData = this.metricsService.getCategoryBreakdown();
    this.renderCategoryChart(categoryData);
  }

  renderMonthlyChart(data) {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;

    const labels = data.map(d => d.monthName.substring(0, 3));
    const incomeData = data.map(d => d.income);
    const expensesData = data.map(d => d.expenses);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Ingresos',
            data: incomeData,
            backgroundColor: '#22c55e',
          },
          {
            label: 'Gastos',
            data: expensesData,
            backgroundColor: '#ef4444',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  renderCategoryChart(data) {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const labels = data.map(d => d.category);
    const values = data.map(d => d.amount);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#3b82f6', '#ef4444', '#22c55e', '#eab308',
            '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    });
  }

  handleAddExpense(e) {
    e.preventDefault();
    const form = e.target;
    const description = form.querySelector('[name="description"]').value;
    const amount = parseFloat(form.querySelector('[name="amount"]').value);
    const category = form.querySelector('[name="category"]').value;
    const type = form.querySelector('[name="type"]').value;

    try {
      this.expenseService.createExpense(description, amount, category, null, type);
      form.reset();
      this.loadDashboard();
      this.showSuccess('Gasto agregado exitosamente');
    } catch (error) {
      this.showError(error.message);
    }
  }

  handleAddDebt(e) {
    e.preventDefault();
    const form = e.target;
    const creditor = form.querySelector('[name="creditor"]').value;
    const amount = parseFloat(form.querySelector('[name="amount"]').value);
    const totalAmount = parseFloat(form.querySelector('[name="totalAmount"]').value) || amount;
    const dueDate = form.querySelector('[name="dueDate"]').value;
    const interestRate = parseFloat(form.querySelector('[name="interestRate"]').value) || 0;

    try {
      this.debtService.createDebt(creditor, amount, totalAmount, dueDate, interestRate);
      form.reset();
      this.loadDashboard();
      this.showSuccess('Deuda agregada exitosamente');
    } catch (error) {
      this.showError(error.message);
    }
  }

  handleAddGoal(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="name"]').value;
    const targetAmount = parseFloat(form.querySelector('[name="targetAmount"]').value);
    const currentAmount = parseFloat(form.querySelector('[name="currentAmount"]').value) || 0;
    const deadline = form.querySelector('[name="deadline"]').value;
    const priority = form.querySelector('[name="priority"]').value;

    try {
      this.goalService.createGoal(name, targetAmount, currentAmount, deadline, priority);
      form.reset();
      this.loadDashboard();
      this.showSuccess('Meta creada exitosamente');
    } catch (error) {
      this.showError(error.message);
    }
  }

  deleteExpense(id) {
    if (confirm('¿Estás seguro de eliminar este gasto?')) {
      try {
        this.expenseService.deleteExpense(id);
        this.loadDashboard();
        this.showSuccess('Gasto eliminado');
      } catch (error) {
        this.showError(error.message);
      }
    }
  }

  openPaymentModal(debtId) {
    const modal = document.getElementById('paymentModal');
    const debtIdInput = document.getElementById('paymentDebtId');
    
    if (modal && debtIdInput) {
      debtIdInput.value = debtId;
      modal.classList.add('active');
    }
  }

  handleAddPayment(e) {
    e.preventDefault();
    const form = e.target;
    const debtId = parseInt(document.getElementById('paymentDebtId').value);
    const amount = parseFloat(form.querySelector('[name="paymentAmount"]').value);

    try {
      this.debtService.addPayment(debtId, amount);
      form.reset();
      document.getElementById('paymentModal').classList.remove('active');
      this.loadDashboard();
      this.showSuccess('Pago registrado exitosamente');
    } catch (error) {
      this.showError(error.message);
    }
  }

  openContributionModal(goalId) {
    const modal = document.getElementById('contributionModal');
    const goalIdInput = document.getElementById('contributionGoalId');
    
    if (modal && goalIdInput) {
      goalIdInput.value = goalId;
      modal.classList.add('active');
    }
  }

  handleAddContribution(e) {
    e.preventDefault();
    const form = e.target;
    const goalId = parseInt(document.getElementById('contributionGoalId').value);
    const amount = parseFloat(form.querySelector('[name="contributionAmount"]').value);

    try {
      this.goalService.addContribution(goalId, amount);
      form.reset();
      document.getElementById('contributionModal').classList.remove('active');
      this.loadDashboard();
      this.showSuccess('Aporte registrado exitosamente');
    } catch (error) {
      this.showError(error.message);
    }
  }

  handleNavigation(e) {
    e.preventDefault();
    const target = e.target.getAttribute('data-target');
    
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    document.getElementById(target)?.classList.add('active');
    e.target.classList.add('active');
  }

  showSuccess(message) {
    this.showToast(message, 'success');
  }

  showError(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
  dashboard = new DashboardUI();
  dashboard.init();
});
