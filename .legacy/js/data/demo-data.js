// Generador de datos de prueba para GastoClaro

const { User, Expense, Debt, Goal } = require('./models');

function generateDemoData() {
  const users = [];
  const expenses = [];
  const debts = [];
  const goals = [];

  // Usuario demo
  const demoUser = new User(1, 'demo', 'demo@gastoclaro.com', 'demo123');
  users.push(demoUser);

  const userId = demoUser.id;
  const today = new Date();

  // Categorías de gastos
  const categories = ['Alimentación', 'Transporte', 'Vivienda', 'Servicios', 'Entretenimiento', 'Salud', 'Educación', 'Ropa'];
  
  // Generar 25 gastos de los últimos 3 meses
  for (let i = 0; i < 25; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    const expense = new Expense(
      i + 1,
      userId,
      `Gasto ${i + 1} - ${categories[i % categories.length]}`,
      (Math.random() * 500 + 20).toFixed(2),
      categories[i % categories.length],
      date.toISOString(),
      Math.random() > 0.8 ? 'income' : 'expense'
    );
    expenses.push(expense);
  }

  // Agregar algunos ingresos fijos
  expenses.push(new Expense(26, userId, 'Salario Mensual', 2500, 'Salario', new Date(today.getFullYear(), today.getMonth(), 1).toISOString(), 'income'));
  expenses.push(new Expense(27, userId, 'Freelance Project', 800, 'Extra', new Date(today.getFullYear(), today.getMonth(), 15).toISOString(), 'income'));

  // Generar 3 deudas
  const debtsData = [
    { creditor: 'Banco ABC', amount: 5000, totalAmount: 5000, dueDate: new Date(today.getFullYear(), today.getMonth() + 6, 1).toISOString(), interestRate: 12 },
    { creditor: 'Tarjeta XYZ', amount: 1200, totalAmount: 2000, dueDate: new Date(today.getFullYear(), today.getMonth() + 2, 15).toISOString(), interestRate: 18 },
    { creditor: 'Préstamo Personal', amount: 3000, totalAmount: 3000, dueDate: new Date(today.getFullYear(), today.getMonth() + 12, 1).toISOString(), interestRate: 10 }
  ];

  debtsData.forEach((debtData, index) => {
    const debt = new Debt(
      index + 1,
      userId,
      debtData.creditor,
      debtData.amount,
      debtData.totalAmount,
      debtData.dueDate,
      debtData.interestRate
    );
    debts.push(debt);
  });

  // Generar 4 metas
  const goalsData = [
    { name: 'Fondo de Emergencia', targetAmount: 10000, currentAmount: 3500, deadline: new Date(today.getFullYear(), today.getMonth() + 12, 31).toISOString(), priority: 'high' },
    { name: 'Vacaciones', targetAmount: 5000, currentAmount: 1200, deadline: new Date(today.getFullYear(), today.getMonth() + 6, 1).toISOString(), priority: 'medium' },
    { name: 'Auto Nuevo', targetAmount: 25000, currentAmount: 5000, deadline: new Date(today.getFullYear() + 2, today.getMonth(), 1).toISOString(), priority: 'medium' },
    { name: 'Laptop', targetAmount: 2000, currentAmount: 800, deadline: new Date(today.getFullYear(), today.getMonth() + 3, 1).toISOString(), priority: 'low' }
  ];

  goalsData.forEach((goalData, index) => {
    const goal = new Goal(
      index + 1,
      userId,
      goalData.name,
      goalData.targetAmount,
      goalData.currentAmount,
      goalData.deadline,
      goalData.priority
    );
    goals.push(goal);
  });

  return {
    users,
    expenses,
    debts,
    goals,
    credentials: {
      username: 'demo',
      password: 'demo123'
    }
  };
}

// Exportar para uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateDemoData };
}

// Función global para usar en navegador
if (typeof window !== 'undefined') {
  window.generateDemoData = generateDemoData;
}
