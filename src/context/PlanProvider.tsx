import { createContext, useContext, useState, useEffect } from 'react';
import { PLAN_LIMITS, type PlanType, type PlanLimits } from '../types';

interface PlanContextType {
  plan: PlanType;
  limits: PlanLimits;
  setPlan: (plan: PlanType) => void;
}

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlanState] = useState<PlanType>(() => {
    const saved = localStorage.getItem('top5_plan');
    return (saved as PlanType) || 'free';
  });

  useEffect(() => {
    localStorage.setItem('top5_plan', plan);
  }, [plan]);

  const setPlan = (newPlan: PlanType) => {
    setPlanState(newPlan);
  };

  const value = {
    plan,
    limits: PLAN_LIMITS[plan],
    setPlan,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};