import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Herosec from './pages/Herosec/Herosec';
import Mock from './pages/Mock';
import SkillPractice from './pages/SkillPractice/SkillPractice';
import ProtectedRoute from './Components/ProtectedRoute';
import AddHRPage from './pages/Admin/addHr';
import AdminLogin from './pages/Admin/AdminLogin';
import { Toaster } from 'sonner';
import AdminDashboard from './pages/Admin/AdminDashboard';



const AppContent = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/admin/login', '/admin/dashboard','/add-hr'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Herosec />} />
        <Route path="/mock" element={<Mock />} />
        <Route path="/skill" element={<SkillPractice />} />
        <Route path="/admin/login" element={<AdminLogin />} />
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
      </Routes>
    </>
  );
};


function App() {

  return (
    <main>
      <Router>
      <AppContent/>
      </Router>
      <Toaster richColors position='top-center' />
    </main>
  );
};

export default App;
