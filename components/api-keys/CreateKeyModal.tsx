import { useState } from 'react';

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export function CreateKeyModal({ isOpen, onClose, onSubmit }: CreateKeyModalProps) {
  const [newKeyName, setNewKeyName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!newKeyName.trim()) return;
    await onSubmit(newKeyName);
    setNewKeyName("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Create New API Key</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
              Key Name
            </label>
            <input
              id="keyName"
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 