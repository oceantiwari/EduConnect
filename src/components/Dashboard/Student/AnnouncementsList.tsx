import React from 'react';

interface Announcement {
  title: string;
  content: string;
  time: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
  onViewAll: () => void;
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements, onViewAll }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
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
          {announcements.map((announcement, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                <span className="text-xs text-gray-500">{announcement.time}</span>
              </div>
              <p className="text-sm text-gray-700">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsList;
