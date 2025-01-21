import { create } from 'zustand';
import { toast } from 'react-hot-toast';

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

interface ApiKeyStore {
  apiKeys: ApiKey[];
  isLoading: boolean;
  fetchApiKeys: () => Promise<ApiKey[]>;
  createApiKey: (name: string) => Promise<ApiKey>;
  deleteApiKey: (id: string) => Promise<void>;
  updateApiKey: (id: string, data: Partial<ApiKey>) => Promise<void>;
  toggleKeyReveal: (id: string) => void;
  copyKeyToClipboard: (key: string) => Promise<void>;
}

export const useApiKeyStore = create<ApiKeyStore>((set, get) => ({
  apiKeys: [],
  isLoading: true,

  fetchApiKeys: async () => {
    try {
      const response = await fetch("/api/keys");
      if (!response.ok) throw new Error("Failed to fetch keys");
      
      const data = await response.json();
      set({
        apiKeys: data.map((key: ApiKey) => ({
          ...key,
          key: `${key.key.slice(0, 5)}-${'*'.repeat(33)}`,
          fullKey: key.key,
          isRevealed: false
        })),
        isLoading: false
      });
      return data as ApiKey[];
    } catch (error) {
      console.error("Error fetching keys:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  createApiKey: async (name: string) => {
    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create key");
      
      await get().fetchApiKeys();
      return data as ApiKey;
    } catch (error) {
      console.error("Error creating key:", error);
      throw error;
    }
  },

  deleteApiKey: async (id: string) => {
    try {
      const response = await fetch(`/api/keys?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete key");
      
      set(state => ({
        apiKeys: state.apiKeys.filter(key => key.id !== id)
      }));

      toast.success('API Key deleted successfully', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#DC2626',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '6px',
        },
      });
    } catch (error) {
      console.error("Error deleting key:", error);
      toast.error('Failed to delete API Key');
    }
  },

  updateApiKey: async (id: string, data: Partial<ApiKey>) => {
    try {
      const response = await fetch(`/api/keys?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update key');

      const updatedKey = await response.json();
      set(state => ({
        apiKeys: state.apiKeys.map(key => 
          key.id === id ? { ...key, ...updatedKey } : key
        )
      }));
    } catch (error) {
      console.error('Error updating key:', error);
      throw error;
    }
  },

  toggleKeyReveal: (id: string) => {
    set(state => ({
      apiKeys: state.apiKeys.map(key => 
        key.id === id ? { ...key, isRevealed: !key.isRevealed } : key
      )
    }));
  },

  copyKeyToClipboard: async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success('Copied API Key to clipboard', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '6px',
        },
      });
    } catch (error) {
      console.error('Error copying key:', error);
      toast.error('Failed to copy API Key');
    }
  },
})); 