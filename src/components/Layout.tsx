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
            <strong>🏆 Top 5</strong>
          </Link>
          <nav className="header-nav">
            <Link to="/">Mis Listas</Link>
            <Link to="/planes" className="plan-badge">
              {PLAN_NAMES[plan]}
            </Link>
          </nav>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <small>Hecho con ❤️ para organizar tus favoritos</small>
      </footer>
    </div>
  );
};