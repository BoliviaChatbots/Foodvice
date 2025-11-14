import { Routes, Route } from "react-router-dom";
import 'boxicons'
import '/node_modules/boxicons/css/boxicons.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from "./components/Navbar";
import SliderDemo from "./components/SliderDemo";
import Restaurantes from "./pages/Restaurantes";
import { Inicio } from "./pages/Inicio";
import { Showing } from "./pages/Showing";
import { LoginRegister } from "./pages/LoginRegister";
import Footer from "./components/Footer";

import AskandQuest from "./components/AskandQuest";
import Banner from "./components/Banner";
import LoginSide from "./components/LoginSide";
import RegisterSide from "./components/RegisterSide";
import EditUser from "./components/EditUser";
import LoginAvatar from "./components/LoginAvatar";
import FilterBar from "./components/FilterBar";
import { Restaurante } from "./pages/Restaurante";

function App() {

  return (
    <>
      {/* <Datainc loggedIn={false} userImage="/logoblanco.png" /> */}


      <Navbar />
      <LoginSide />
      <RegisterSide />
      <LoginAvatar />
      <EditUser />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/restaurants" element={<Restaurantes />} />
        <Route path="/showroom" element={<Showing />} />
        <Route path="/restaurant/:url" element={<Restaurante />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
