import { Link, Outlet } from 'react-router-dom';
import { usePlan } from '../context/PlanProvider';

const PLAN_NAMES: Record<string, string> = {
  free: 'Gratis',
  starter: 'Starter',
  premium: 'Premium',
  ultimate: 'Ultimate',
};

export const Layout = () => {
  const { plan } = usePlan();

  return (
    <div className="fade-in">
      <header>
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">🏆</span>
            <strong>TOP 5</strong>
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Mis Listas</Link>
            <Link to="/planes" className={`plan-badge plan-${plan}`}>
              <span className="plan-dot"></span>
              {PLAN_NAMES[plan]}
            </Link>
          </nav>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-description">
              <div className="footer-brand">
                <span>🏆</span>
                <strong>TOP 5</strong>
              </div>
              <p>La mejor manera de organizar y compartir tus rankings favoritos. Crea tus Top 5 personalizados con estilo.</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Planes</h4>
                <Link to="/planes">Ver planes</Link>
                <span className="current-plan-text">Plan actual: {PLAN_NAMES[plan]}</span>
              </div>
              <div className="footer-section">
                <h4>Tus Listas</h4>
                <Link to="/">Ver todas</Link>
                <Link to="/">Crear nueva</Link>
              </div>
            </div>
          </div>
          
          <div className="footer-divider"></div>
          
          <div className="footer-bottom">
            <span>© 2026 Top 5. Todos los derechos reservados.</span>
            <span className="footer-made">Hecho con ♥ para ayudarte a organizar tus rankings</span>
          </div>
        </div>
      </footer>
    </div>
  );
};