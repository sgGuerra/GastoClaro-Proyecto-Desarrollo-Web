'use client';

export default function Contacto() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', color: '#1a73e8', textAlign: 'center', marginBottom: '20px' }}>Contáctanos</h1>
      <p style={{ textAlign: 'center', color: '#5f6368', marginBottom: '40px' }}>¿Tienes alguna duda o sugerencia? Escríbenos y te responderemos lo antes posible.</p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" />
        </div>
        <div>
          <label>Mensaje</label>
          <textarea rows="5" placeholder="¿Cómo podemos ayudarte?"></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => alert('Mensaje enviado (Simulado)')}>Enviar Mensaje</button>
      </form>
    </div>
  );
}
