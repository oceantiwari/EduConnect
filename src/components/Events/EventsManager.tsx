import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Bell, X, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EventsManager: React.FC = () => {
  const { user } = useAuth();
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [eventDepartureStatus, setEventDepartureStatus] = useState<Record<string, 'LEFT' | 'NOT_LEFT'>>({
    '1': 'LEFT',
    '2': 'NOT_LEFT'
  });

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
      imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: 'Please bring your science projects and display materials. Parents are encouraged to attend and support their children.',
      contactPerson: 'Ms. Davis',
      contactPhone: '+91 9876543210'
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
      imageUrl: 'https://images.pexels.com/photos/8112161/pexels-photo-8112161.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: 'Please arrive 15 minutes early for your scheduled slot. Bring your child\'s progress report and any questions you may have.',
      contactPerson: 'School Office',
      contactPhone: '+91 9876543210'
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
      imageUrl: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: 'Students should wear their sports uniform and bring water bottles. Parents are welcome to cheer from the designated seating area.',
      contactPerson: 'Mr. Johnson (Sports Teacher)',
      contactPhone: '+91 9876543211'
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
      imageUrl: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: 'All art materials will be provided. Please wear clothes that can get messy. Children and parents will work together on projects.',
      contactPerson: 'Ms. Smith (Art Teacher)',
      contactPhone: '+91 9876543212'
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

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleDepartureStatusChange = (eventId: string, status: 'LEFT' | 'NOT_LEFT') => {
    setEventDepartureStatus(prev => ({ ...prev, [eventId]: status }));
    // In real app, this would submit to backend
    console.log(`Event ${eventId} departure status: ${status}`);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
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
            <div 
              key={event.id} 
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
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

                {/* Departure Status for Parents */}
                {user?.role === 'PARENT' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">Will your child attend this event?</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDepartureStatusChange(event.id, 'LEFT');
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                          eventDepartureStatus[event.id] === 'LEFT'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'border border-gray-300 text-gray-700 hover:bg-emerald-50'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Yes, Attending
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDepartureStatusChange(event.id, 'NOT_LEFT');
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                          eventDepartureStatus[event.id] === 'NOT_LEFT'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'border border-gray-300 text-gray-700 hover:bg-red-50'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        Not Attending
                      </button>
                    </div>
                    {eventDepartureStatus[event.id] && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Status: {eventDepartureStatus[event.id] === 'LEFT' ? 'Attending' : 'Not Attending'}
                      </p>
                    )}
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <div className="h-64 bg-gray-200 overflow-hidden rounded-t-xl">
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
              </div>
              <button
                onClick={closeEventDetails}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedEvent.category)}`}>
                  {selectedEvent.category}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
              
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date</p>
                    <p className="text-sm text-gray-600">{selectedEvent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time</p>
                    <p className="text-sm text-gray-600">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Venue</p>
                    <p className="text-sm text-gray-600">{selectedEvent.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contact</p>
                    <p className="text-sm text-gray-600">{selectedEvent.contactPerson}</p>
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{selectedEvent.instructions}</p>
              </div>
              
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-medium">{selectedEvent.contactPerson}</span>
                  <span>•</span>
                  <a href={`tel:${selectedEvent.contactPhone}`} className="text-purple-600 hover:underline">
                    {selectedEvent.contactPhone}
                  </a>
                </div>
              </div>
              
              {/* Registration Status */}
              {selectedEvent.registrationRequired && (
                <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Registration Status</h3>
                    {isRegistrationFull(selectedEvent) && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Full
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">
                    {selectedEvent.currentParticipants}
                    {selectedEvent.maxParticipants && `/${selectedEvent.maxParticipants}`} registered
                  </p>
                  <button
                    onClick={() => registerForEvent(selectedEvent.id)}
                    disabled={isRegistrationFull(selectedEvent)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isRegistrationFull(selectedEvent) ? 'Registration Full' : 'Register Now'}
                  </button>
                </div>
              )}
              
              {/* Departure Status for Parents */}
              {user?.role === 'PARENT' && (
                <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Attendance Status</h3>
                  <p className="text-gray-700 mb-3">Will your child attend this event?</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDepartureStatusChange(selectedEvent.id, 'LEFT')}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        eventDepartureStatus[selectedEvent.id] === 'LEFT'
                          ? 'bg-emerald-600 text-white'
                          : 'border border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Yes, Attending
                    </button>
                    <button
                      onClick={() => handleDepartureStatusChange(selectedEvent.id, 'NOT_LEFT')}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        eventDepartureStatus[selectedEvent.id] === 'NOT_LEFT'
                          ? 'bg-red-600 text-white'
                          : 'border border-red-600 text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                      Not Attending
                    </button>
                  </div>
                  {eventDepartureStatus[selectedEvent.id] && (
                    <div className="mt-3 p-3 bg-white rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Status: {eventDepartureStatus[selectedEvent.id] === 'LEFT' ? 'Attending' : 'Not Attending'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        You can change this status anytime before the event.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={closeEventDetails}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManager;