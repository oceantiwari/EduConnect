// Component is already defined at the top of the file
import React, { useState } from "react";
import { Calendar, Clock, Users, Bell, Info, MapPin, Plus, X } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  imageUrl?: string;
  registrationRequired?: boolean;
  currentParticipants: number;
  maxParticipants?: number;
}

interface User {
  role: "SCHOOL_ADMIN" | "TEACHER" | "STUDENT";
}

const EventsManager: React.FC<{ user?: User }> = ({ user }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Initialize with sample data
  React.useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: "1",
        title: "Annual Science Fair",
        description: "Showcase your scientific experiments and innovations at our annual science fair. Open to all students from grades 6-12.",
        date: "2023-11-15",
        time: "9:00 AM - 4:00 PM",
        venue: "School Main Hall",
        category: "Academic",
        imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        registrationRequired: true,
        currentParticipants: 45,
        maxParticipants: 60
      },
      {
        id: "2",
        title: "Inter-School Basketball Tournament",
        description: "Compete against other schools in our annual basketball tournament. Both junior and senior teams welcome.",
        date: "2023-10-20",
        time: "10:00 AM - 5:00 PM",
        venue: "School Sports Complex",
        category: "Sports",
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        registrationRequired: true,
        currentParticipants: 32,
        maxParticipants: 40
      },
      {
        id: "3",
        title: "Career Guidance Workshop",
        description: "Learn about various career paths and get guidance from industry professionals. Perfect for students in grades 9-12.",
        date: "2023-12-05",
        time: "1:00 PM - 4:00 PM",
        venue: "School Auditorium",
        category: "Workshop",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        registrationRequired: true,
        currentParticipants: 75,
        maxParticipants: 100
      },
      {
        id: "4",
        title: "Annual Cultural Festival",
        description: "Celebrate diversity through music, dance, and art performances from different cultures around the world.",
        date: "2023-09-10",
        time: "11:00 AM - 8:00 PM",
        venue: "School Grounds",
        category: "Cultural",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        registrationRequired: false,
        currentParticipants: 200,
        maxParticipants: undefined
      },
      {
        id: "5",
        title: "Coding Bootcamp",
        description: "Intensive 3-day coding workshop covering web development basics. No prior coding experience required.",
        date: "2023-11-25",
        time: "9:00 AM - 3:00 PM",
        venue: "Computer Lab",
        category: "Workshop",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        registrationRequired: true,
        currentParticipants: 20,
        maxParticipants: 25
      },
      {
        id: "6",
        title: "Environmental Science Exhibition",
        description: "Learn about climate change, conservation efforts, and sustainable practices through interactive exhibits and presentations.",
        date: "2023-12-15",
        time: "10:00 AM - 3:00 PM",
        venue: "School Garden & Exhibition Hall",
        category: "Academic",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        registrationRequired: true,
        currentParticipants: 15,
        maxParticipants: 50
      }
    ];

    // Set the events
    setEvents(sampleEvents);
    
    // Filter upcoming and past events
    const currentDate = new Date();
    setUpcomingEvents(sampleEvents.filter(event => new Date(event.date) >= currentDate));
    setPastEvents(sampleEvents.filter(event => new Date(event.date) < currentDate));
  }, []);


  // Helpers
  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
    setShowEventDetails(false);
  };

  const isRegistrationFull = (event: Event) =>
    event.maxParticipants ? event.currentParticipants >= event.maxParticipants : false;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Sports":
        return "bg-green-100 text-green-800";
      case "Cultural":
        return "bg-pink-100 text-pink-800";
      case "Workshop":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const submitEvent = (eventData: Partial<Event>) => {
    console.log("New Event Submitted", eventData);
    setShowNewEvent(false);
  };

  const registerForEvent = (id: string) => {
    console.log("Register for event", id);
  };
  if (user?.role === 'SCHOOL_ADMIN' || user?.role === 'TEACHER') {
    return (
      <>
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
              <div key={event.id} className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => openEventDetails(event)}>
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
                    <div className="mt-2 flex justify-end">
                      <button 
                        className="text-purple-600 text-sm font-medium flex items-center gap-1 hover:text-purple-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEventDetails(event);
                        }}
                      >
                        <Info className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close button (X) */}
              <button
                onClick={closeEventDetails}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Full-size image if available */}
              {selectedEvent.imageUrl ? (
                <div className="w-full h-64 sm:h-80 bg-gray-200">
                  <img 
                    src={selectedEvent.imageUrl} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-purple-100">
                  <Calendar className="w-16 h-16 text-purple-500" />
                </div>
              )}
              
              <div className="p-6">
                {/* Title and category */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedEvent.category)}`}>
                    {selectedEvent.category}
                  </span>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Description</h4>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Event Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3">Event Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700"><strong>Date:</strong> {selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700"><strong>Time:</strong> {selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700"><strong>Venue:</strong> {selectedEvent.venue}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Registration Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3">Registration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">
                          <strong>Participants:</strong> {selectedEvent.currentParticipants || 0}
                          {selectedEvent.maxParticipants && `/${selectedEvent.maxParticipants}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">
                          <strong>Registration Required:</strong> {selectedEvent.registrationRequired ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {selectedEvent.registrationRequired && new Date(selectedEvent.date) > new Date() && (
                        <div className="mt-4">
                          {user?.role === 'STUDENT' ? (
                            <button
                              disabled={isRegistrationFull(selectedEvent)}
                              onClick={() => registerForEvent(selectedEvent.id)}
                              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                isRegistrationFull(selectedEvent)
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-purple-600 text-white hover:bg-purple-700'
                              }`}
                            >
                              {isRegistrationFull(selectedEvent) ? 'Registration Full' : 'Register Now'}
                            </button>
                          ) : (
                            <p className="text-sm text-gray-600">Registration managed by students</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={closeEventDetails}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }

  // Student view
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Events</h1>
          <p className="text-gray-600">Stay updated with school activities</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="p-6">
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
                  onClick={() => openEventDetails(event)}
                >
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-100">
                        <Calendar className="w-12 h-12 text-purple-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">{event.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm line-clamp-2">{event.description}</p>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
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
                    <button 
                      className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEventDetails(event);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">No upcoming events</div>
          )}
        </div>
      </div>

      {/* Past Events */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Past Events</h3>
        </div>
        <div className="p-6">
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer opacity-80"
                  onClick={() => openEventDetails(event)}
                >
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-100">
                        <Calendar className="w-12 h-12 text-purple-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 line-clamp-1">{event.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm line-clamp-2">{event.description}</p>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
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
                    <button 
                      className="mt-4 w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEventDetails(event);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">No past events</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsManager;
