import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EventsManager: React.FC = () => {
  const { user } = useAuth();
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const events = [
    {
      id: '1',
      title: 'Annual Science Exhibition',
      description: 'Students will showcase their innovative science projects. All parents and community members are welcome to attend.',
      date: '2025-01-25',
      time: '10:00 AM - 4:00 PM',
      venue: 'School Auditorium',
      category: 'Academic',
      registrationRequired: false,
      maxParticipants: null,
      currentParticipants: 0,
      imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      description: 'Individual meetings to discuss student progress and development. Please schedule your slot with the class teacher.',
      date: '2025-01-20',
      time: '2:00 PM - 6:00 PM',
      venue: 'Individual Classrooms',
      category: 'Academic',
      registrationRequired: true,
      maxParticipants: 150,
      currentParticipants: 98,
      imageUrl: 'https://images.pexels.com/photos/8112161/pexels-photo-8112161.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Sports Day 2025',
      description: 'Annual sports competition featuring track and field events, team games, and cultural performances.',
      date: '2025-02-05',
      time: '8:00 AM - 5:00 PM',
      venue: 'School Playground',
      category: 'Sports',
      registrationRequired: false,
      maxParticipants: null,
      currentParticipants: 0,
      imageUrl: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Art & Craft Workshop',
      description: 'Interactive workshop for students and parents to explore creativity through various art forms.',
      date: '2025-01-30',
      time: '10:00 AM - 12:00 PM',
      venue: 'Art Room',
      category: 'Workshop',
      registrationRequired: true,
      maxParticipants: 30,
      currentParticipants: 18,
      imageUrl: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800';
      case 'Sports': return 'bg-emerald-100 text-emerald-800';
      case 'Workshop': return 'bg-purple-100 text-purple-800';
      case 'Cultural': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const submitEvent = (data: any) => {
    console.log('New event:', data);
    setShowNewEvent(false);
  };

  const registerForEvent = (eventId: string) => {
    console.log('Registering for event:', eventId);
    // In real app, this would submit to backend
  };

  const isRegistrationFull = (event: any) => {
    return event.maxParticipants && event.currentParticipants >= event.maxParticipants;
  };

  if (user?.role === 'SCHOOL_ADMIN' || user?.role === 'TEACHER') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
              <p className="text-gray-600">Create and manage school events</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewEvent(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>

        {/* Event Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Registrations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.reduce((sum, event) => sum + event.currentParticipants, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications Sent</p>
                <p className="text-2xl font-bold text-gray-900">324</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">All Events</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {events.map((event) => (
              <div key={event.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </div>
                    </div>
                    {event.registrationRequired && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {event.currentParticipants}
                          {event.maxParticipants && `/${event.maxParticipants}`} registered
                        </span>
                        {isRegistrationFull(event) && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Full
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Events</h1>
          <p className="text-gray-600">Stay updated with upcoming school events and activities</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </div>
                </div>
                {event.registrationRequired ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {event.currentParticipants}
                        {event.maxParticipants && `/${event.maxParticipants}`} registered
                      </span>
                      {isRegistrationFull(event) && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Full
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => registerForEvent(event.id)}
                      disabled={isRegistrationFull(event)}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isRegistrationFull(event) ? 'Registration Full' : 'Register Now'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <Users className="w-4 h-4" />
                    <span>Open to all - No registration required</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="divide-y divide-gray-100">
              {pastEvents.map((event) => (
                <div key={event.id} className="p-4 opacity-75">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{event.date}</span>
                        <span>{event.venue}</span>
                        {event.registrationRequired && (
                          <span>{event.currentParticipants} attended</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter event description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 10:00 AM - 4:00 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  placeholder="Enter venue location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-2" />
                  Registration Required
                </label>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => submitEvent({})}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewEvent(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManager;