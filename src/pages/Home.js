import React, { useState, useEffect, useContext } from "react";
import EventList from "../components/EventList";
import CreateEvent from "../components/CreateEvent";
import Logout from "../components/Logout";
import Login from "../components/Login";
import { AuthContext } from "../components/AuthProvider";
import Banner from "../components/Banner"; // Banner bileşenini ekledik

const Home = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      {user ? (
        <div>
          <h1>Hoşgeldiniz, {user.displayName || user.email}!</h1>
          <img src={user.photoURL} alt="Profil Fotoğrafı" width="100" />
          <p>Email: {user.email}</p>
          <Logout /> {/* Çıkış butonunu ekledik */}
        </div>
      ) : (
        <div>
          <p>Giriş Yapmadınız</p>
        </div>
      )}
      <Banner />
      <EventList />

      {user ? (
        <div>
          <CreateEvent />
        </div>
      ) : (
        <h6>Etkinlik oluştur</h6>
      )}
    </div>
  );
};

export default Home;
