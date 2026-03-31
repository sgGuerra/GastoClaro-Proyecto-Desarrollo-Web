import Link from 'next/link';

export default function Producto() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', color: '#1a73e8', textAlign: 'center', marginBottom: '40px' }}>Nuestros Planes</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2>Plan Gratuito</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#34a853', margin: '20px 0' }}>$0</p>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '30px' }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Registro manual de gastos</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Categorías básicas</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Gráfica simple</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Persistencia local</li>
          </ul>
          <Link href="/app" className="btn btn-primary">Elegir Plan</Link>
        </div>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', textAlign: 'center', border: '2px solid #1a73e8' }}>
          <h2>Plan Plus (Próximamente)</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a73e8', margin: '20px 0' }}>$3 - $5</p>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '30px' }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Cuenta de usuario en la nube</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Historial de gastos por meses</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Presupuesto mensual</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>✓ Exportación PDF / Excel</li>
          </ul>
          <button className="btn btn-secondary" disabled>Próximamente</button>
        </div>
      </div>
    </div>
  );
}
