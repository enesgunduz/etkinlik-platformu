import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { signInWithGoogle, logOut } from "../firebase";
import "./styles/Navbar.css"

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)

  const handleAuth = async () => {
    if (user) {
      await logOut();
      navigate("/login"); // Çıkış yaptıktan sonra Login sayfasına yönlendir
    } else {
      await signInWithGoogle();
      navigate("/"); // Giriş yapınca Ana Sayfa'ya yönlendir
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        📌 Toplulug
      </Link>

      {/* Sağdaki butonlar */}
      <div className="navbar-links">
        <Link to="/events" >
          Etkinlikler
        </Link>
        <Link to="/sehirler" >
          Şehirler
        </Link>
        <button className="navbar-button" onClick={handleAuth} >
          {user ? "Çıkış Yap" : "Google ile Giriş Yap"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
