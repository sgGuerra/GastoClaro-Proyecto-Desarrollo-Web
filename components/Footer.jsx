import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <h4>GastoClaro</h4>
            <p>La aplicación más simple para controlar tus gastos personales. Diseñada para todos, sin conocimientos financieros necesarios.</p>
          </div>
          <div className="footer-links">
            <h4>Enlaces</h4>
            <Link href="/">Inicio</Link>
            <Link href="/about">Acerca de</Link>
            <Link href="/producto">Planes</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <Link href="#">Términos de Uso</Link>
            <Link href="#">Política de Privacidad</Link>
            <Link href="#">Cookies</Link>
          </div>
          <div className="footer-links">
            <h4>Contacto</h4>
            <p>📧 info@gastoclaro.com</p>
            <p>📍 Medellín</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GastoClaro. Todos los derechos reservados.</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: linear-gradient(135deg, var(--bg-dark) 0%, #2d2d2d 100%);
          color: white;
          padding: 3rem 0 2rem;
          margin-top: 3rem;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
        .site-footer h4 {
          color: white;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        .site-footer p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }
        .site-footer a {
          color: rgba(255, 255, 255, 0.7);
          display: block;
          padding: 0.25rem 0;
          transition: 0.2s;
        }
        .site-footer a:hover {
          color: white;
          padding-left: 5px;
        }
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-bottom p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </footer>
  );
}
