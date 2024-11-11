import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Platform from "./pages/Platform";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:id" element={<Platform />} />
    </Routes>
  );
}

export default App;
