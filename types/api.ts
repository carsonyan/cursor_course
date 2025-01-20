export interface ApiKey {
  id: string;
  name: string;
  key: string;
  fullKey?: string;
  usage: number;
  isRevealed?: boolean;
  monthlyLimit?: number;
  enablePII?: boolean;
  createdAt?: string;
} 