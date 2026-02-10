# 💸 GastoClaro

> Controla tu dinero sin complicaciones

GastoClaro es una aplicación web para el control de gastos personales, pensada para personas que buscan una solución **simple, visual y accesible** para gestionar su dinero sin conocimientos financieros previos.

---

## 📌 Descripción del proyecto

GastoClaro permite registrar gastos diarios, clasificarlos por categorías y visualizar el gasto mensual mediante totales y gráficos claros.  
El enfoque principal es fomentar **hábitos financieros saludables** a través de una experiencia sencilla y rápida.

---

## 🧭 Misión

Ayudar a las personas a **entender y controlar sus gastos diarios** de forma simple, visual y sin estrés, fomentando mejores hábitos financieros.

---

## 🔭 Visión

Convertirse en una herramienta accesible para estudiantes y jóvenes trabajadores que desean **tomar decisiones financieras conscientes**, sin necesidad de conocimientos financieros avanzados.

---

## 🎯 Objetivos

- Permitir registrar gastos de forma rápida
- Visualizar en qué se va el dinero
- Promover el hábito de registrar gastos diariamente
- Ofrecer información clara para mejorar la toma de decisiones financieras

---

## 💎 Propuesta de valor

¿Por qué usar GastoClaro y no otra aplicación?

- ✅ Simplicidad extrema, sin funciones innecesarias
- ✅ Diseñada para personas sin conocimientos financieros
- ✅ Visualización clara y amigable
- ✅ Funciona directamente desde el navegador
- ✅ Enfocada en hábitos, no solo en números

> *Registra un gasto en menos de 10 segundos.*

---

## 🧩 Oferta: productos y servicios

### 🆓 Plan Gratuito (MVP)

Funcionalidades incluidas:

- Registro manual de gastos
- Categorías básicas (comida, transporte, ocio, etc.)
- Total de gastos mensual
- Gráfica simple por categorías
- Persistencia de datos en el navegador (localStorage)

**Costo:** Gratis

---

### ⭐ Plan Plus (futuro)

Incluye todo el plan gratuito más:

- Cuenta de usuario
- Historial de gastos por meses
- Presupuesto mensual
- Alertas visuales al superar límites
- Exportación de datos (PDF / Excel)

**Costo estimado:** $3 – $5 USD / mes

---

### 🚀 Plan Pro (futuro)

- Análisis de hábitos de gasto
- Recomendaciones automáticas
- Comparativas mensuales
- Modo familia

**Costo estimado:** $8 – $10 USD / mes

> ⚠️ Para este proyecto académico / de aprendizaje solo se implementa el **Plan Gratuito (MVP)**.

---

## 🛣️ Roadmap del proyecto

### 🟢 Fase 0 – Preparación
- Definición del alcance del MVP
- Diseño de wireframes básicos
- Creación del repositorio en GitHub

---

### 🟢 Fase 1 – Estructura base
- Estructura HTML
- Estilos básicos con CSS
- Formulario para agregar gastos
- Listado visual de gastos

---

### 🟢 Fase 2 – Lógica con JavaScript
- Captura de datos del formulario
- Validaciones básicas
- Gestión de gastos en memoria
- Mostrar y eliminar gastos

---

### 🟢 Fase 3 – Persistencia de datos
- Guardar gastos en `localStorage`
- Cargar datos al iniciar la aplicación
- Cálculo automático del total mensual

---

### 🟢 Fase 4 – Visualización
- Gráfica de gastos por categoría
- Actualización dinámica de datos
- Colores y diseño enfocados en claridad

---

### 🟢 Fase 5 – Experiencia de usuario
- Mensajes de feedback
- Estados vacíos
- Diseño responsive

---

## 📁 Estructura de carpetas

```plaintext
gasto-claro/
│
gasto-claro/
│
├── index.html
├── about.html
├── producto.html
├── contacto.html
│
├── css/
│   ├── base.css
│   ├── index.css
│   ├── about.css
│   ├── producto.css
│   └── contacto.css
│   ├── base.css          // reset, variables, tipografía
│   ├── layout.css        // header, main, footer
│   └── components.css    // formularios, botones, tarjetas
│
├── js/
│   ├── app.js            // punto de entrada
│   ├── data/
│   │   └── gastos.js     // modelo de datos
│   │
│   ├── services/
│   │   └── storage.js    // localStorage
│   │
│   └── ui/
│       ├── header.js     // lógica del header
│       ├── resumen.js    // sección resumen
│       ├── formulario.js// sección registro de gasto
│       └── lista.js      // sección listado de gastos
│
└── assets/
    ├── icons/
    └── images/

