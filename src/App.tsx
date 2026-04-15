import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login";
import Register from "./Components/register";
import {PrivateRoute} from "./Components/PrivateRoute";
import Menu from "./Components/menu";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Rutas Privadas */}
        <Route 
          path="/menu" 
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;