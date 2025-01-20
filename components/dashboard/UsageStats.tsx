export function UsageStats() {
  return (
    <div className="mb-8 p-8 rounded-xl bg-gradient-to-r from-rose-200 to-blue-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
          <h2 className="text-4xl font-bold text-white">Researcher</h2>
        </div>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors">
          Manage Plan
        </button>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">API Limit</span>
          <span className="text-white/70">ⓘ</span>
        </div>
        <div className="bg-white/20 rounded-full h-2 mb-1">
          <div className="bg-white rounded-full h-full w-[20%]" />
        </div>
        <div className="text-sm text-white/90">197/1,000 Credits</div>
      </div>
    </div>
  );
} 