import { usePlan } from '../context/PlanProvider';
import { type PlanType } from '../types';

const PLAN_INFO = {
  free: {
    name: 'Gratis',
    price: '0€',
    description: 'Para empezar a organizar tus favoritos',
    features: [
      'Hasta 10 listas',
      'Hasta 5 elementos por lista',
      'Compartir Top 5',
    ],
  },
  starter: {
    name: 'Starter',
    price: '2.99€/mes',
    description: 'Para usar a diario',
    features: [
      'Hasta 25 listas',
      'Hasta 7 elementos por lista',
      'Compartir Top 5',
    ],
  },
  premium: {
    name: 'Premium',
    price: '4.99€/mes',
    description: 'Para los más creativos',
    features: [
      'Hasta 50 listas',
      'Hasta 10 elementos por lista',
      'Compartir Top 5',
      'Exportar a JSON',
      'Imágenes personalizadas',
    ],
  },
  ultimate: {
    name: 'Ultimate',
    price: '9.99€/mes',
    description: 'Sin límites para siempre',
    features: [
      'Listas ilimitadas',
      'Elementos ilimitados',
      'Compartir Top 5',
      'Exportar a JSON',
      'Imágenes personalizadas',
      'Tema personalizado',
      'Soporte prioritario',
    ],
  },
};

const ALL_FEATURES = [
  {
    section: 'Límites',
    items: [
      {
        label: 'Hasta 10 listas',
        plans: ['free'],
      },
      {
        label: 'Hasta 25 listas',
        plans: ['starter'],
      },
      {
        label: 'Hasta 50 listas',
        plans: ['premium'],
      },
      {
        label: 'Listas ilimitadas',
        plans: ['ultimate'],
      },

      {
        label: 'Hasta 5 elementos por lista',
        plans: ['free'],
      },
      {
        label: 'Hasta 7 elementos por lista',
        plans: ['starter'],
      },
      {
        label: 'Hasta 10 elementos por lista',
        plans: ['premium'],
      },
      {
        label: 'Elementos ilimitados',
        plans: ['ultimate'],
      },
    ],
  },

  {
    section: 'Funciones',
    items: [
      {
        label: 'Compartir Top 5',
        plans: ['free', 'starter', 'premium', 'ultimate'],
      },
      {
        label: 'Exportar a JSON',
        plans: ['premium', 'ultimate'],
      },
      {
        label: 'Imágenes personalizadas',
        plans: ['premium', 'ultimate'],
      },
      {
        label: 'Tema personalizado',
        plans: ['ultimate'],
      },
      {
        label: 'Soporte prioritario',
        plans: ['ultimate'],
      },
    ],
  },
];

export const Plans = () => {
  const { plan, setPlan, limits } = usePlan();

  const handleSelectPlan = (planType: PlanType) => {
    setPlan(planType);
  };

  return (
    <div className="slide-up">
      <h2 className="plans-title">Elige tu plan</h2>

      <p className="plans-subtitle">
        Plan actual: <strong>{PLAN_INFO[plan].name}</strong>
      </p>

      <div className="plans-grid">
        {(Object.keys(PLAN_INFO) as PlanType[]).map((planType) => {

          return (
            <article
              key={planType}
              className={`plan-card ${
                plan === planType ? 'current-plan' : ''
              }`}
            >
              {planType === 'premium' && (
                <span className="plan-badge-recommended">
                  Más popular
                </span>
              )}

              <h3>{PLAN_INFO[planType].name}</h3>

              <p className="plan-price">
                {PLAN_INFO[planType].price}
              </p>

              <p className="plan-description">
                {PLAN_INFO[planType].description}
              </p>

              <ul className="plan-features">
                {ALL_FEATURES.map((group) => (
                  <div key={group.section}>
                    <li className="plan-feature-section">
                      {group.section}
                    </li>

                    {group.items.map((feature) => {
                      const included = feature.plans.includes(planType);

                      /* EN LÍMITES:
                        solo mostramos el límite real del plan */
                      if (
                        group.section === 'Límites' &&
                        !included
                      ) {
                        return null;
                      }

                      return (
                        <li
                          key={feature.label}
                          className={
                            included
                              ? 'feature-enabled'
                              : 'feature-disabled'
                          }
                        >
                          <span className="check">
                            {included ? '✓' : '✕'}
                          </span>

                          {feature.label}
                        </li>
                      );
                    })}
                  </div>
                ))}
              </ul>

              {plan === planType ? (
                <button className="secondary" disabled>
                  Plan actual
                </button>
              ) : (
                <button
                  onClick={() => handleSelectPlan(planType)}
                  className={planType === 'free' ? 'secondary' : ''}
                >
                  {planType === 'free'
                    ? 'Cambiar a Gratis'
                    : planType === 'starter'
                    ? 'Mejorar a Starter'
                    : planType === 'premium'
                    ? 'Mejorar a Premium'
                    : 'Mejorar a Ultimate'}
                </button>
              )}
            </article>
          );
        })}
      </div>

      <div className="current-limits">
        <h4>Límites actuales</h4>

        <p>
          Listas:{' '}
          {limits.maxLists === -1
            ? 'Ilimitadas'
            : limits.maxLists}
        </p>

        <p>
          Elementos por lista:{' '}
          {limits.maxItems === -1
            ? 'Ilimitados'
            : limits.maxItems}
        </p>

        <p>
          Imágenes:{' '}
          {limits.customImages
            ? '✓ Activado'
            : '✕ No disponible'}
        </p>

        <p>
          Tema:{' '}
          {limits.customTheme
            ? '✓ Personalizable'
            : '✕ No disponible'}
        </p>
      </div>
    </div>
  );
};