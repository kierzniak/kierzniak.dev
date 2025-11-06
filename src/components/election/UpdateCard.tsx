import { LiveUpdate } from '@/types/election';

interface UpdateCardProps {
  update: LiveUpdate;
}

export function UpdateCard({ update }: UpdateCardProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getBadgeColor = (type: LiveUpdate['type']) => {
    switch (type) {
      case 'breaking':
        return 'bg-[#CC0000] text-white';
      case 'result':
        return 'bg-[#CD5200] text-white';
      default:
        return 'bg-[#CCCCCC] text-[#3F4345]';
    }
  };

  return (
    <div className="border-b border-[#CCCCCC] pb-4 mb-4 last:border-b-0">
      {/* Time and Badge on same line */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#666666] text-xs font-serif font-medium">
          {formatTime(update.timestamp)}
        </span>
        {update.type !== 'update' && (
          <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${getBadgeColor(update.type)} uppercase tracking-wide`}>
            {update.type}
          </span>
        )}
      </div>

      {/* Content */}
      <div>
        <p className="text-[#000000] leading-snug font-serif text-sm">{update.content}</p>
      </div>
    </div>
  );
}
