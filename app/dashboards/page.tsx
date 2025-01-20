"use client";

import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { useApiKeyStore } from "@/stores/apiKeyStore";
import { CreateKeyModal } from "@/components/api-keys/CreateKeyModal";
import { EditModal } from "@/components/api-keys/EditModal";
import { ApiKeyList } from "@/components/api-keys/ApiKeyList";
import { UsageStats } from "@/components/dashboard/UsageStats";
import { ContactSection } from "@/components/dashboard/ContactSection";
import { ApiKey } from '@/types/api';

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  
  const { fetchApiKeys, createApiKey } = useApiKeyStore();

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const handleCreateKey = async (name: string) => {
    try {
      await createApiKey(name);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating key:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster />
      
      <div className="text-sm mb-8 text-gray-600">
        Pages / Overview
      </div>

      <h1 className="text-3xl font-bold mb-8">Overview</h1>

      <UsageStats />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">API Keys</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-2xl text-gray-900 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
          </p>
        </div>

        <ApiKeyList
          onEdit={(key) => {
            setEditingKey(key);
            setEditModalOpen(true);
          }}
        />
      </div>

      <CreateKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateKey}
      />

      {editModalOpen && editingKey && (
        <EditModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditingKey(null);
          }}
          apiKey={editingKey}
        />
      )}

      <ContactSection />
    </div>
  );
}