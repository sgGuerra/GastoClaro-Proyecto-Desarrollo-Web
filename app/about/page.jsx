import Link from 'next/link';

export default function About() {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#1a73e8', marginBottom: '20px' }}>Sobre GastoClaro</h1>
      <p style={{ fontSize: '1.2rem', color: '#5f6368', lineHeight: '1.8' }}>
        GastoClaro nació con una misión simple: Ayudar a las personas a entender y controlar sus gastos diarios de forma simple, visual y sin estrés, fomentando mejores hábitos financieros.
      </p>
      <div style={{ marginTop: '40px' }}>
        <Link href="/app" className="btn btn-primary">Comienza a ahorrar hoy</Link>
      </div>
    </div>
  );
}
