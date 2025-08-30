import { Routes, Route } from "react-router-dom";
import 'boxicons'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import SliderDemo from "./components/SliderDemo";
import { Restaurantes } from "./pages/Restaurantes";
import { Inicio } from "./pages/Inicio";
import { Showing } from "./pages/Showing";
import { LoginRegister } from "./pages/LoginRegister";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contact" element={<h1>Contactenos</h1>} />
        <Route path="/showroom" element={<Showing />} />
        <Route path="/restaurants" element={<Restaurantes />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </>
  );
}

export default App;
