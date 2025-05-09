import React, { useState, useEffect, useContext } from "react";
import EventList from "../components/EventList";
import Banner from "../components/Banner"; // Banner bileşenini ekledik

const Home = () => {

  return (
    <div className="container">
      
      <Banner />
      <EventList />

 
    </div>
  );
};

export default Home;
