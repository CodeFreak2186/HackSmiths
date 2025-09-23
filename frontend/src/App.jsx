import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/pages/home";
import Login from "/src/pages/Login";
import Register from "/src/pages/Register";
import MapPage from "/src/pages/mappage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
