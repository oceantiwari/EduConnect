import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = lazy(() => import('../components/Landing/LandingPage'));
const LoginPage = lazy(() => import('../components/Auth/LoginPage'));
const SignUpPage = lazy(() => import('../components/Auth/SignUpPage'));
const Admin2FAVerification = lazy(() => import('../components/Auth/Admin2FAVerification'));
const DashboardLayout = lazy(() => import('../components/Layout/DashboardLayout'));
const DashboardContainer = lazy(() => import('../components/Dashboard/DashboardContainer'));
const AttendanceManager = lazy(() => import('../components/Attendance/AttendanceManager'));
const PraiseComplaintsManager = lazy(() => import('../components/PraiseComplaints/PraiseComplaintsManager'));
const SchoolStore = lazy(() => import('../components/Store/SchoolStore'));
const AnnouncementsManager = lazy(() => import('../components/Announcements/AnnouncementsManager'));
const EventsManager = lazy(() => import('../components/Events/EventsManager'));
const PerformanceTracker = lazy(() => import('../components/Performance/PerformanceTracker'));
const TestsManager = lazy(() => import('../components/Tests/TestsManager'));
const ChildRequestsManager = lazy(() => import('../components/Admin/ChildRequestsManager'));
const UserRegistrationsManager = lazy(() => import('../components/Admin/UserRegistrationsManager'));
const NotificationPanel = lazy(() => import('../components/Notifications/NotificationPanel'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const StudentsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Management</h1>
    <p className="text-gray-600">Student management functionality coming soon...</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
    <p className="text-gray-600">Settings panel coming soon...</p>
  </div>
);

export const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-2fa"
            element={
              <PublicRoute>
                <Admin2FAVerification userId="" email="" />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardContainer />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AttendanceManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/praise"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PraiseComplaintsManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PerformanceTracker />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SchoolStore />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnnouncementsManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EventsManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tests"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TestsManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/child-requests"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ChildRequestsManager adminId={user?.id || ''} />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-registrations"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UserRegistrationsManager adminId={user?.id || ''} schoolId={user?.schoolId || ''} />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                 <NotificationPanel onClose={() => console.log('Notification panel closed')} />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};