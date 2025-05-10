import React, { useState, useEffect, useContext } from "react";
import EventList from "../components/EventList";
import Banner from "../components/Banner"; 
import CTA from "../components/CTA"; 
import Features from "../components/Features";

const Home = () => {

  return (
    <div className="container">
      
      <Banner />
      <EventList />
      <Features/>
      <CTA/>

 
    </div>
  );
};

export default Home;
