import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Platform from "./pages/Platform";
import Admin from "./pages/Admin";
import ProblemAdminPanel from "./components/ui/problem";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<Platform />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/problems" element={<ProblemAdminPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
