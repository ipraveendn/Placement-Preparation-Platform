import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Herosec from './pages/Herosec/Herosec';
import Mock from './pages/Mock';
import SkillPractice from './pages/SkillPractice/SkillPractice';
import Questions from './pages/Questions/Questions';
import Login from './Components/login';
import Register from './Components/register';
import Footer from './Components/footer';
import ProtectedRoute from './Components/ProtectedRoute';
import AddHRPage from './pages/Admin/addHr';
import AdminLogin from './pages/Admin/AdminLogin';
import { Toaster } from 'sonner';
import AdminDashboard from './pages/Admin/AdminDashboard';
<<<<<<< HEAD
import HrDashboard from './pages/Hr/HrDashboard';
import RequestMockInterview from './pages/User/RequestMockInterview';
import HrLogin from './pages/Hr/HrLogin';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import UserProtectedRoute from './Components/UserProtectedRoute';
=======
import Profile from './pages/Profile/Profile';


>>>>>>> 4eac87f020642e1b5423f88e78d965aa301eb34a

const AppContent = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    '/admin/login',
    '/admin/dashboard',
    '/add-hr',
    '/hr/dashboard',
    '/login',
    '/signup'
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={
          <UserProtectedRoute>
            <Herosec />
          </UserProtectedRoute>
        } />
        <Route path="/mock" element={<Mock />} />
        <Route path="/skill" element={<SkillPractice />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/hr/login" element={<HrLogin />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-hr" element={
          <ProtectedRoute>
            <AddHRPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
<<<<<<< HEAD
        <Route path="/hr/dashboard" element={
          <ProtectedRoute>
            <HrDashboard />
          </ProtectedRoute>
        } />
        <Route path="/request-interview" element={
          <ProtectedRoute>
            <RequestMockInterview />
          </ProtectedRoute>
        } />
=======
        <Route path="/profile" element={<Profile />} />
>>>>>>> 4eac87f020642e1b5423f88e78d965aa301eb34a
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

function App() {
  return (
    <main>
      <Router>
        <AppContent />
      </Router>
      <Toaster richColors position='top-center' />
    </main>
  );
}

export default App;
