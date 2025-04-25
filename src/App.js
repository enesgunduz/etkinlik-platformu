import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import EventDetails from "./pages/EventDetails"; // Detay sayfası için yeni bir bileşen ekleyeceğiz
import NotFound from "./pages/NotFound"; // 404 sayfası ekleyeceğiz
import AuthProvider from "./components/AuthProvider"; // AuthProvider'ı ekliyoruz
import Navbar from "./components/Navbar"; // Navbar bileşeni

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navbar /> {/* Navbar tüm sayfalarda görünecek */}
        <Routes>
          {/* Ana Sayfa */}
          <Route path="/" element={<Home/>} />

          {/* Etkinlik Detay Sayfası */}
          <Route path="/event/:id" element={<EventDetails />} />

          {/* 404 Sayfası */}
          <Route path="*" element={<NotFound />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
