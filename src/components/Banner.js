import React from "react";
import "./styles/Banner.css"

const Banner = () => {
  return (
    <div className="banner">
      <h1>Etkinlik Platformu</h1>
      <p>
        Topluluğunu yönetmek, fiziksel veya çevrim içi etkinlikler düzenlemek
        için ihtiyacın olan her şey burada.
      </p>
      <button className="banner-button">Bir etkinlik oluşturun</button> 
    </div>
  );
};

export default Banner;
