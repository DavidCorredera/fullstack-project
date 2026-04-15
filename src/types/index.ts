export interface Item {
  id: string;
  title: string;
  description?: string;
}

export interface TopList {
  id: string;
  title: string;
  category: string;
  items: Item[]; // Aquí está la magia: este array nunca debe tener más de 5 elementos
  createdAt: number;
}