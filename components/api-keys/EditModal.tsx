import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import type { ApiKey } from '@/stores/apiKeyStore';
import { useApiKeyStore } from '@/stores/apiKeyStore';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: ApiKey;
}

export function EditModal({ isOpen, onClose, apiKey }: EditModalProps) {
  const [name, setName] = useState(apiKey.name);
  const [monthlyLimit, setMonthlyLimit] = useState(apiKey.monthlyLimit || 1000);
  const [enablePII, setEnablePII] = useState(apiKey.enablePII || false);
  
  const { updateApiKey } = useApiKeyStore();

  const handleSave = async () => {
    try {
      await updateApiKey(apiKey.id, {
        name,
        monthlyLimit,
        enablePII,
      });
      onClose();
    } catch (error) {
      console.error('Error updating API key:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Edit API key
          </Dialog.Title>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Name — A unique name to identify this key
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter key name"
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="limitUsage"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={true}
                  readOnly
                />
                <label htmlFor="limitUsage" className="ml-2 text-sm font-medium text-gray-700">
                  Limit monthly usage*
                </label>
              </div>
              <input
                type="number"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="piiRestrictions"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={enablePII}
                  onChange={(e) => setEnablePII(e.target.checked)}
                />
                <label htmlFor="piiRestrictions" className="ml-2 text-sm font-medium text-gray-700">
                  Enable PII Restrictions — Configure how to handle Personal Identifiable Information (PII) in user queries
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 