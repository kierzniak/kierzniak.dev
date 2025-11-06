export function LiveUpdatesSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#CCCCCC]">
        <h2 className="text-lg font-bold font-serif" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>Live Updates</h2>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#CD5200] animate-pulse"></div>
          <span className="text-xs text-[#666666] font-serif font-medium">Loading...</span>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-[#CCCCCC] pb-4 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-16 bg-[#CCCCCC] rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-[#CCCCCC] rounded"></div>
              <div className="h-3 w-3/4 bg-[#CCCCCC] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
