import { useApiKeyStore } from "@/stores/apiKeyStore";
import type { ApiKey } from "@/stores/apiKeyStore";

interface ApiKeyListProps {
  onEdit: (key: ApiKey) => void;
}

export function ApiKeyList({ onEdit }: ApiKeyListProps) {
  const { apiKeys, toggleKeyReveal, copyKeyToClipboard, deleteApiKey } = useApiKeyStore();

  return (
    <div className="divide-y divide-gray-200">
      <div className="grid grid-cols-[1fr,100px,2fr,100px] px-6 py-3 text-sm text-gray-500 font-medium">
        <div>NAME</div>
        <div>USAGE</div>
        <div>KEY</div>
        <div className="text-center">OPTIONS</div>
      </div>

      {apiKeys.map((key) => (
        <div key={key.id} className="grid grid-cols-[1fr,100px,2fr,100px] px-6 py-4 items-center">
          <div className="font-medium text-gray-900">{key.name}</div>
          <div className="text-sm text-gray-900">{key.usage}</div>
          <div className="font-mono text-sm text-gray-600">
            {key.isRevealed ? key.fullKey : key.key}
          </div>
          <div className="flex justify-end gap-2 pr-2">
            <button 
              onClick={() => toggleKeyReveal(key.id)}
              className="text-gray-600 hover:text-gray-900"
              title="View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5C5 5 1 12 1 12C1 12 5 19 12 19C19 19 23 12 23 12C23 12 19 5 12 5Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button 
              onClick={() => copyKeyToClipboard(key.fullKey || key.key)}
              className="text-gray-600 hover:text-gray-900"
              title="Copy"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            <button 
              onClick={() => onEdit(key)}
              className="text-gray-600 hover:text-gray-900"
              title="Edit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
              </svg>
            </button>
            <button
              onClick={() => deleteApiKey(key.id)}
              className="text-gray-600 hover:text-gray-900"
              title="Delete"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 