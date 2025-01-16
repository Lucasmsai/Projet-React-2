import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isLogged = !!localStorage.getItem("token"); // retourne true si le token existe, sinon false

  const navigate = useNavigate();
  const handleLogout = () => {
    // Supprimer le token du localStorage
    console.log("Token avant suppression:", localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log("Token apres suppression:", localStorage.getItem("token"));

    // Rediriger l'utilisateur vers la page d'accueil
    navigate("/");
  };

  

  return (
  <>
  
  <div className="bg-white h-[50px] mx-auto relative">
    <div className="font-['kanit'] font-semibold text-2xl text-center absolute top-2 left-0 right-0">
      E-Magaz.com
    </div>
    
    <div className="absolute top-0 right-2 p-0">
    {isLogged ? (
        <button className="form-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      ) : (
        !isAuthPage && (
          <Link to="/login">
            <button className="form-btn">
              Connexion
            </button>
          </Link>
        )
      )}


    
    </div>
  </div>  

   </>
  )
}