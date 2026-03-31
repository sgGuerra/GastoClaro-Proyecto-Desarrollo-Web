'use client';

import { useState, useEffect } from 'react';
import { AuthService, ExpenseService } from '../../lib/services';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { User, LogOut, Wallet, Plus, Trash2, TrendingUp, TrendingDown, LayoutDashboard } from 'lucide-react';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [authService] = useState(() => new AuthService());
  const [expenseService] = useState(() => new ExpenseService());

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState('');

  // App State
  const [activeTab, setActiveTab] = useState('overview');
  const [expenses, setExpenses] = useState([]);
  const [metrics, setMetrics] = useState({ income: 0, expense: 0, balance: 0 });
  const [categorySummary, setCategorySummary] = useState({});

  useEffect(() => {
    checkAuth();
  }, [authService]);

  const checkAuth = () => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);
      setUser(authService.getCurrentUser());
      loadData();
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const loadData = () => {
    setExpenses(expenseService.getAllExpenses().sort((a,b) => new Date(b.date) - new Date(a.date)));
    setMetrics(expenseService.getMetrics());
    setCategorySummary(expenseService.getCategorySummary());
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isLogin) {
        authService.login(username, password);
      } else {
        authService.register(username, email, password);
        authService.login(username, password);
      }
      checkAuth();
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const logout = () => {
    authService.logout();
    checkAuth();
  };

  // Render Auth
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '20px' }}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button className={`btn ${isLogin ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '10px' }} onClick={() => setIsLogin(true)}>Entrar</button>
            <button className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '10px' }} onClick={() => setIsLogin(false)}>Registro</button>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label>Usuario</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            {!isLogin && (
              <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            )}
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {authError && <div style={{ color: 'var(--danger)', fontSize: '0.9rem', textAlign: 'center' }}>{authError}</div>}
            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{isLogin ? 'Acceder' : 'Crear Cuenta'}</button>
          </form>

          {isLogin && <p style={{ fontSize: '0.8rem', color: 'var(--text-medium)', marginTop: '20px', textAlign: 'center' }}>Demo: demo / demo123 (Crea una cuenta si falla)</p>}
        </div>
      </div>
    );
  }

  // --- Render Dashboard ---
  const chartData = {
    labels: Object.keys(categorySummary),
    datasets: [{
      data: Object.values(categorySummary),
      backgroundColor: ['#1a73e8', '#34a853', '#fbbc04', '#ef4444', '#8b5cf6', '#06b6d4'],
      hoverOffset: 4
    }]
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      expenseService.createExpense(
        form.description.value,
        form.amount.value,
        form.category.value,
        new Date().toISOString(),
        form.type.value
      );
      form.reset();
      loadData();
    } catch(err) {
      alert(err.message);
    }
  };

  const handleDeleteExpense = (id) => {
    try {
      expenseService.deleteExpense(id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-light)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'white', padding: '20px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wallet /> GastoClaro
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setActiveTab('overview')} className={`btn ${activeTab==='overview'?'btn-primary':'btn-outline'}`} style={{ textAlign: 'left', display: 'flex', gap: '10px' }}>
            <LayoutDashboard size={20} /> Resumen
          </button>
          <button onClick={() => setActiveTab('expenses')} className={`btn ${activeTab==='expenses'?'btn-primary':'btn-outline'}`} style={{ textAlign: 'left', display: 'flex', gap: '10px' }}>
            <TrendingUp size={20} /> Movimientos
          </button>
        </nav>
        <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <User size={30} color="var(--primary-color)" />
            <div>
              <p style={{ margin: 0, fontWeight: '600' }}>{user.username}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-medium)' }}>{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="btn" style={{ width: '100%', background: 'var(--bg-light)', color: 'var(--danger)', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <h1 style={{ marginBottom: '30px', color: 'var(--text-dark)' }}>Hola, {user.username} 👋</h1>
            
            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
                <p style={{ color: 'var(--text-medium)', marginBottom: '5px' }}>Balance Total</p>
                <h2 style={{ fontSize: '2rem', color: metrics.balance >= 0 ? 'var(--primary-color)' : 'var(--danger)', margin: 0 }}>${metrics.balance.toFixed(2)}</h2>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
                <p style={{ color: 'var(--text-medium)', marginBottom: '5px' }}>Ingresos</p>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--success)', margin: 0 }}>+${metrics.income.toFixed(2)}</h2>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
                <p style={{ color: 'var(--text-medium)', marginBottom: '5px' }}>Gastos</p>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--danger)', margin: 0 }}>-${metrics.expense.toFixed(2)}</h2>
              </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--text-medium)' }}>Gastos por Categoría</h3>
                {Object.keys(categorySummary).length > 0 ? (
                  <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                    <Doughnut data={chartData} />
                  </div>
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--text-medium)' }}>No hay datos suficientes.</p>
                )}
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)', overflowY: 'auto', maxHeight: '400px' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--text-medium)' }}>Actividad Reciente</h3>
                {expenses.slice(0, 5).map(e => (
                  <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'var(--bg-light)', borderRadius: '10px', marginBottom: '10px' }}>
                    <div>
                      <p style={{ fontWeight: '600', margin: 0 }}>{e.description}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-medium)', margin: 0 }}>{e.category}</p>
                    </div>
                    <p style={{ fontWeight: 'bold', color: e.type==='income'?'var(--success)':'var(--danger)' }}>
                      {e.type==='income'?'+':'-'}${e.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="animate-fade-in">
            <h1 style={{ marginBottom: '30px' }}>Gestión de Movimientos</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
              {/* Add form */}
              <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)', alignSelf: 'start' }}>
                <h3 style={{ marginBottom: '20px' }}>Nuevo Registro</h3>
                <form onSubmit={handleExpenseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div><label>Concepto</label><input type="text" name="description" required /></div>
                  <div><label>Monto</label><input type="number" step="0.01" name="amount" required min="0.01" /></div>
                  <div>
                    <label>Categoría</label>
                    <select name="category" required>
                      <option value="Alimentación">Alimentación</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Vivienda">Vivienda</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Ocio">Ocio</option>
                      <option value="Salario">Salario</option>
                      <option value="Extra">Extra</option>
                    </select>
                  </div>
                  <div>
                    <label>Tipo</label>
                    <select name="type" required>
                      <option value="expense">Gasto</option>
                      <option value="income">Ingreso</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}><Plus size={20} /> Registrar</button>
                </form>
              </div>

              {/* List */}
              <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '20px' }}>Historial</h3>
                {expenses.length === 0 ? <p>No hay registros todavía.</p> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {expenses.map(e => (
                      <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'var(--bg-light)', borderRadius: '10px' }}>
                        <div>
                          <p style={{ fontWeight: '600', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {e.type==='income' ? <TrendingUp size={16} color="var(--success)"/> : <TrendingDown size={16} color="var(--danger)"/>}
                            {e.description}
                          </p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-medium)', margin: 0 }}>{e.category} - {new Date(e.date).toLocaleDateString()}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: e.type==='income'?'var(--success)':'var(--danger)' }}>
                            ${e.amount.toFixed(2)}
                          </span>
                          <button onClick={() => handleDeleteExpense(e.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-medium)', cursor: 'pointer' }} title="Eliminar">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
