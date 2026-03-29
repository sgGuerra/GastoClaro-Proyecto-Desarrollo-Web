# GastoClaro - Aplicación de Gestión Financiera Personal

## 📋 Descripción

GastoClaro es una aplicación web para el control y seguimiento de finanzas personales. Permite a los usuarios gestionar sus gastos, ingresos, deudas y metas financieras, además de proporcionar métricas y recomendaciones personalizadas.

## ✨ Características Principales

- **🔐 Sistema de Autenticación**: Registro e inicio de sesión de usuarios
- **💰 Gestión de Gastos e Ingresos**: Registro y categorización de movimientos financieros
- **📋 Control de Deudas**: Seguimiento de deudas con sistema de pagos parciales
- **🎯 Metas Financieras**: Establecimiento y seguimiento de objetivos de ahorro
- **📊 Dashboard Interactivo**: Visualización de métricas clave
- **📈 Gráficas**: Tendencias mensuales y distribución por categorías
- **💡 Recomendaciones**: Sugerencias basadas en la salud financiera

## 🚀 Instalación y Uso

### Opción 1: Abrir directamente en el navegador

1. Abre el archivo `app.html` en tu navegador web preferido
2. Usa las credenciales demo o regístrate con un nuevo usuario

### Opción 2: Usar el generador de datos demo

1. Abre `generate-demo.html` en tu navegador
2. Haz clic en "Generar Nuevos Datos" (se genera automáticamente al cargar)
3. Haz clic en "Ir a la Aplicación"

## 🔑 Datos de Prueba

La aplicación incluye un usuario demo preconfigurado:

```
Usuario: demo
Contraseña: demo123
```

### Datos incluidos en la demo:

- **25-30 gastos e ingresos** de diferentes categorías
- **3 deudas** con diferentes tasas de interés:
  - Banco ABC: $5,000 (12% interés)
  - Tarjeta XYZ: $1,200/$2,000 (18% interés)
  - Préstamo Personal: $3,000 (10% interés)
- **4 metas financieras**:
  - Fondo de Emergencia: $3,500/$10,000 (35%)
  - Vacaciones: $1,200/$5,000 (24%)
  - Auto Nuevo: $5,000/$25,000 (20%)
  - Laptop: $800/$2,000 (40%)

## 🧪 Ejecutar Pruebas Unitarias

Las pruebas unitarias verifican el correcto funcionamiento de todos los componentes:

```bash
node tests/test-app.js
```

### Cobertura de pruebas:

- ✅ Modelos de datos (User, Expense, Debt, Goal)
- ✅ Servicios (Auth, Expenses, Debts, Goals, Metrics)
- ✅ Cálculo de métricas y salud financiera
- ✅ Generación de recomendaciones

## 📁 Estructura del Proyecto

```
/workspace
├── app.html                 # Aplicación principal
├── generate-demo.html       # Generador de datos demo
├── css/
│   └── app.css             # Estilos de la aplicación
├── js/
│   ├── data/
│   │   ├── models.js       # Modelos de datos
│   │   └── demo-data.js    # Generador de datos demo
│   ├── services/
│   │   ├── auth.js         # Servicio de autenticación
│   │   ├── expenses.js     # Servicio de gastos
│   │   ├── debts.js        # Servicio de deudas
│   │   ├── goals.js        # Servicio de metas
│   │   └── metrics.js      # Servicio de métricas
│   └── ui/
│       └── dashboard.js    # Lógica de interfaz de usuario
└── tests/
    └── test-app.js         # Pruebas unitarias
```

## 🎯 Cómo Usar la Aplicación

### 1. Inicio de Sesión

- Abre `app.html` en tu navegador
- Ingresa las credenciales demo (`demo` / `demo123`) o regístrate
- Accederás al dashboard principal

### 2. Dashboard Principal

El panel muestra:
- **Tarjetas de métricas**: Ingresos, gastos, balance, deudas totales, progreso de metas
- **Salud financiera**: Indicador visual del 0-100
- **Gráfica de tendencia mensual**: Comparativa ingresos vs gastos
- **Gráfica de categorías**: Distribución de gastos por categoría
- **Recomendaciones**: Sugerencias personalizadas

### 3. Gestionar Gastos

1. Ve a la pestaña "Gastos"
2. Completa el formulario con:
   - Descripción
   - Monto
   - Categoría
   - Tipo (Gasto/Ingreso)
3. Haz clic en "Agregar"
4. Visualiza tus últimos movimientos en la lista inferior

### 4. Gestionar Deudas

1. Ve a la pestaña "Deudas"
2. Para agregar una deuda, completa:
   - Acreedor
   - Monto total
   - Monto pendiente
   - Tasa de interés
   - Fecha de vencimiento
3. Para registrar un pago, haz clic en "Pagar" en la deuda correspondiente

### 5. Gestionar Metas

1. Ve a la pestaña "Metas"
2. Para crear una meta, completa:
   - Nombre
   - Monto objetivo
   - Monto actual (opcional)
   - Fecha límite (opcional)
   - Prioridad
3. Para aportar a una meta, haz clic en "Aportar"

## 💡 Consejos de Uso

- **Registra todos tus gastos** diariamente para tener un panorama preciso
- **Revisa las recomendaciones** regularmente para mejorar tu salud financiera
- **Establece metas realistas** con fechas límite alcanzables
- **Prioriza pagar deudas** con altas tasas de interés
- **Usa el dashboard** para monitorear tu progreso semanalmente

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsivos
- **JavaScript (ES6+)** - Lógica de negocio
- **Chart.js** - Visualización de gráficas
- **LocalStorage** - Persistencia de datos en el navegador

## 📝 Notas Importantes

1. Los datos se almacenan en el **LocalStorage** del navegador
2. Para limpiar todos los datos, usa el generador demo o limpia el localStorage manualmente
3. La aplicación funciona completamente en el cliente (sin servidor)
4. Compatible con navegadores modernos (Chrome, Firefox, Edge, Safari)

## 👥 Soporte

Para generar nuevos datos de prueba en cualquier momento:
1. Abre `generate-demo.html`
2. Haz clic en "Generar Nuevos Datos"
3. Esto limpiará los datos existentes y creará nuevos datos demo

---

**¡Disfruta gestionando tus finanzas con GastoClaro! 💰✨**
