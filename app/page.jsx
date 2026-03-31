import Link from 'next/link';
import './landing.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Controla Tu Dinero Sin Complicaciones</h1>
          <p className="subtitle">La aplicación más simple para gestionar tus gastos personales. Registra, visualiza y mejora tus hábitos financieros.</p>
          <div className="hero-buttons">
            <Link href="/app" className="btn btn-primary" style={{ background: 'white', color: '#1a73e8' }}>Comenzar Gratis</Link>
            <Link href="/about" className="btn btn-outline-light">Saber Más</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Usuarios</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Gastos Registrados</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99%</span>
            <span className="stat-label">Satisfacción</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.8</span>
            <span className="stat-label">Valoración</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>¿Por Qué Elegir GastoClaro?</h2>
          <p>La herramienta perfecta para tomar el control de tus finanzas personales</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Registro Rápido</h3>
            <p>Registra un gasto en menos de 10 segundos. Interfaz intuitiva diseñada para eficiencia.</p>
          </div>
          <div className="feature-card" style={{ borderTopColor: '#34a853' }}>
            <div className="feature-icon">📊</div>
            <h3>Visualización Clara</h3>
            <p>Gráficos simples que te muestran exactamente en qué se va tu dinero cada mes.</p>
          </div>
          <div className="feature-card" style={{ borderTopColor: '#fbbc04' }}>
            <div className="feature-icon">🎯</div>
            <h3>Enfoque en Hábitos</h3>
            <p>Promovemos finanzas saludables a través de herramientas que fomentan el registro diario.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <div className="why-grid">
          <div className="why-content">
            <h2 style={{ color: '#1a73e8', fontSize: '2.2rem', marginBottom: '20px' }}>Tu Compañero Financiero</h2>
            <p style={{ color: '#5f6368', fontSize: '1.05rem', marginBottom: '30px' }}>GastoClaro está diseñado específicamente para personas sin conocimientos financieros previos. Creemos que controlar tu dinero no tiene que ser complicado.</p>
            <ul className="why-list">
              <li>Sin necesidad de conocimientos financieros</li>
              <li>Interfaz amigable e intuitiva</li>
              <li>Datos almacenados localmente (privacidad)</li>
              <li>Totalmente gratuito para comenzar</li>
              <li>Diseño responsive (funciona en cualquier dispositivo)</li>
            </ul>
          </div>
          <div className="why-image">💸</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Comienza Hoy Mismo</h2>
          <p>Únete a miles de personas que ya están tomando control de sus finanzas con GastoClaro.</p>
          <Link href="/app" className="btn btn-primary" style={{ background: 'white', color: '#1a73e8' }}>Empezar Gratis</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Lo Que Dicen Nuestros Usuarios</h2>
          <p>Experiencias de personas que ya están usando GastoClaro</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text" style={{ fontStyle: 'italic', color: '#5f6368' }}>&quot;Finalmente una app que entiendo. Puedo registrar mis gastos en segundos y ver claramente dónde se va mi dinero.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">M</div>
              <div className="testimonial-info">
                <h4 style={{ margin: 0 }}>María González</h4>
                <span style={{ color: '#5f6368', fontSize: '0.9rem' }}>Estudiante</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text" style={{ fontStyle: 'italic', color: '#5f6368' }}>&quot;Excelente para personas como yo que no entendemos de finanzas. Muy fácil de usar y muy útil.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">J</div>
              <div className="testimonial-info">
                <h4 style={{ margin: 0 }}>Juan Pérez</h4>
                <span style={{ color: '#5f6368', fontSize: '0.9rem' }}>Trabajador</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text" style={{ fontStyle: 'italic', color: '#5f6368' }}>&quot;He logrado ahorrar más desde que uso GastoClaro. Me ayuda a ser consciente de mis gastos.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">A</div>
              <div className="testimonial-info">
                <h4 style={{ margin: 0 }}>Ana López</h4>
                <span style={{ color: '#5f6368', fontSize: '0.9rem' }}>Freelancer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
