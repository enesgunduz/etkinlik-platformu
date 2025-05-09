import React from "react";
import "./styles/Banner.css"
import { Link } from "react-router-dom";


const Banner = () => {
  return (
    <div className="banner">
      <h1>Etkinlik Platformu</h1>
      <p>
        Topluluğunu yönetmek, fiziksel veya çevrim içi etkinlikler düzenlemek
        için ihtiyacın olan her şey burada.
      </p>
      
      <Link to="/etkinlik-olustur" className="banner-button">
          <button className="banner-button" >Bir etkinlik oluşturun</button> 
      </Link>
    </div>
  );
};

export default Banner;
