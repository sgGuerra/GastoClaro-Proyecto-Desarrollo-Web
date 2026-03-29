// Servicio de autenticación para GastoClaro

const { User } = require('../data/models');

class AuthService {
  constructor(storage) {
    this.storage = storage;
    this.CURRENT_USER_KEY = 'currentUser';
  }

  register(username, email, password) {
    if (!username || !email || !password) {
      throw new Error('Todos los campos son requeridos');
    }

    const users = this.storage.getUsers();
    
    // Verificar si el usuario ya existe
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error('El usuario o email ya está registrado');
    }

    const newUser = new User(
      Date.now(),
      username,
      email,
      password // En producción, debería estar encriptada
    );

    users.push(newUser);
    this.storage.save('users', users);
    
    return { success: true, user: newUser };
  }

  login(username, password) {
    if (!username || !password) {
      throw new Error('Usuario y contraseña son requeridos');
    }

    const users = this.storage.getUsers();
    const user = users.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Guardar sesión
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    
    return { success: true, user };
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true };
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  updateProfile(userId, updates) {
    const users = this.storage.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    this.storage.save('users', users);
    
    // Actualizar sesión actual
    if (this.getCurrentUser()?.id === userId) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
    }
    
    return { success: true, user: users[userIndex] };
  }
}

// Versión para navegador
class AuthServiceBrowser {
  constructor() {
    this.CURRENT_USER_KEY = 'currentUser';
  }

  register(username, email, password) {
    if (!username || !email || !password) {
      throw new Error('Todos los campos son requeridos');
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error('El usuario o email ya está registrado');
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
  }

  login(username, password) {
    if (!username || !password) {
      throw new Error('Usuario y contraseña son requeridos');
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    
    return { success: true, user };
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    return { success: true };
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }
}

// Exportar según el entorno
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AuthService };
}

if (typeof window !== 'undefined') {
  window.AuthService = AuthServiceBrowser;
}
