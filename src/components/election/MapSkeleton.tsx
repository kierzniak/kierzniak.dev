export function MapSkeleton() {
  return (
    <div className="w-full flex items-center justify-center" style={{ height: '700px' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#CCCCCC] border-t-[#0066CC] rounded-full animate-spin"></div>
        <p className="text-[#666666] font-serif text-sm">Loading map...</p>
      </div>
    </div>
  );
}
