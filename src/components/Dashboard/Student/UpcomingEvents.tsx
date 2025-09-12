import React from 'react';
import { FileText, Calendar, BookOpen } from 'lucide-react';

interface Event {
  title: string;
  date: string;
  time: string;
  type: 'test' | 'event' | 'assignment';
}

interface UpcomingEventsProps {
  events: Event[];
  onViewAll: () => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, onViewAll }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'test': return <FileText className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'assignment': return <BookOpen className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          <button 
            onClick={onViewAll}
            className="text-purple-600 text-sm font-medium hover:text-purple-800"
          >
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-50 rounded-lg">
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
