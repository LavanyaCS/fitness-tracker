import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Dashboard from './pages/Dashboard';
import Weighttracker from './pages/WeightTracker/Weighttracker';
import Worklog from './pages/WorkLog/Worklog';
import Goals from './pages/Goals/Goals';
import Profile from './pages/Profile';
import Logout from './pages/Auth/Logout';
import Sidebarmenu from './components/Sidebarmenu';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignupForm />} />

        {/* Protected routes with sidebar */}
        {user && (
          <>
            <Route
              path="/dashboard"
              element={
                <div className="flex min-h-screen">
                  <Sidebarmenu />
                  <main className="flex-1 h-screen overflow-y-auto text-black bg-gray-50 dark:bg-gray-200 dark:text-gray-900">
                    <Dashboard />
                  </main>
                </div>
              }
            />
            <Route
              path="/work-log"
              element={
                <div className="flex min-h-screen">
                  <Sidebarmenu />
                  <main className="flex-1 h-screen overflow-y-auto text-black bg-gray-50 dark:bg-gray-200 dark:text-gray-900">
                    <Worklog />
                  </main>
                </div>
              }
            />
            <Route
              path="/weight-tracker"
              element={
                <div className="flex min-h-screen">
                  <Sidebarmenu />
                  <main className="flex-1 h-screen overflow-y-auto text-black bg-gray-50 dark:bg-gray-200 dark:text-gray-900">
                    <Weighttracker />
                  </main>
                </div>
              }
            />
            <Route
              path="/goals"
              element={
                <div className="flex min-h-screen">
                  <Sidebarmenu />
                  <main className="flex-1 h-screen overflow-y-auto text-black bg-gray-50 dark:bg-gray-200 dark:text-gray-900">
                    <Goals />
                  </main>
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div className="flex min-h-screen">
                  <Sidebarmenu />
                  <main className="flex-1 h-screen overflow-y-auto text-black bg-gray-50 dark:bg-gray-200 dark:text-gray-900">
                    <Profile />
                  </main>
                </div>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </>
        )}

        {/* NotFound route (no sidebar) */}
        <Route
          path="*"
          element={
            user ? (
              <NotFound />
            ) : (
              <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-lg dark:bg-gray-800 rounded-xl">
                  <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
                    Access Restricted
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Please log in to view your FitTracker.
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-2 font-medium text-white transition bg-gray-600 rounded hover:bg-gray-700"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            )
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
