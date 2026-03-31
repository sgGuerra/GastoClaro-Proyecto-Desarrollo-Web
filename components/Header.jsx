import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <h1><Link href="/">💰 GastoClaro</Link></h1>
        <nav>
          <Link href="/">Inicio</Link>
          <Link href="/about">Acerca de</Link>
          <Link href="/producto">Planes</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/app" className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>Ingresar</Link>
        </nav>
      </div>

      <style>{`
        .site-header {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
          color: white;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: var(--shadow-md);
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
        }
        .header-container h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
        }
        .header-container h1 a {
          color: white;
        }
        nav {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        nav a:not(.btn) {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          transition: 0.2s;
        }
        nav a:not(.btn):hover {
          color: white;
          transform: translateY(-2px);
        }
      `}</style>
    </header>
  );
}
