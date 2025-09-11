import { Routes, Route } from "react-router-dom";
import 'boxicons'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from "./components/Navbar";
import SliderDemo from "./components/SliderDemo";
import { Restaurantes } from "./pages/Restaurantes";
import { Inicio } from "./pages/Inicio";
import { Showing } from "./pages/Showing";
import { LoginRegister } from "./pages/LoginRegister";
import Footer from "./components/Footer";
import { Datainc } from "./components/Datainc";
import AskandQuest from "./components/AskandQuest";
function App() {
  return (
    <>
      {/* <Datainc loggedIn={false} userImage="/logoblanco.png" /> */}


      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contact" element={<h1>Contactenos</h1>} />
        <Route path="/showroom" element={<Showing />} />
        <Route path="/restaurants" element={<Restaurantes />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
