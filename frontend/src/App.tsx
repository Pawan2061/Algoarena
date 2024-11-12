import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Platform from './pages/Platform';
import Admin from './pages/Admin';
import ProblemAdminPanel from './components/ui/problem';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<Platform />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/problems" element={<ProblemAdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
