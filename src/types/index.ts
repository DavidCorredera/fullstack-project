export interface Item {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface TopList {
  id: string;
  title: string;
  category: string;
  items: Item[];
  createdAt: number;
  customColor?: string;
  customImage?: string;
}

export type PlanType = 'free' | 'starter' | 'premium' | 'ultimate';

export interface PlanLimits {
  maxLists: number;
  maxItems: number;
  canExport: boolean;
  canShare: boolean;
  prioritySupport: boolean;
  customTheme: boolean;
  customImages: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxLists: 10,
    maxItems: 5,
    canExport: false,
    canShare: true,
    prioritySupport: false,
    customTheme: false,
    customImages: false,
  },
  starter: {
    maxLists: 25,
    maxItems: 7,
    canExport: false,
    canShare: true,
    prioritySupport: false,
    customTheme: false,
    customImages: false,
  },
  premium: {
    maxLists: 50,
    maxItems: 10,
    canExport: true,
    canShare: true,
    prioritySupport: false,
    customTheme: false,
    customImages: true,
  },
  ultimate: {
    maxLists: -1,
    maxItems: -1,
    canExport: true,
    canShare: true,
    prioritySupport: true,
    customTheme: true,
    customImages: true,
  },
};

export interface TopList {
  id: string;
  title: string;
  category: string;
  items: Item[]; // Aquí está la magia: este array nunca debe tener más de 5 elementos
  createdAt: number;
}