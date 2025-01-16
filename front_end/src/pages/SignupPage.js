import React, { useState } from 'react';

import "./SignupPage.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  // État pour les données du formulaire
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [error, setError] = useState(""); // État pour gérer l'erreur
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  // Fonction pour gérer la soumission du formulaire
  const Submit = async (e) => {
    
    e.preventDefault(); // Empêche le rechargement de la page
     // Réinitialiser les erreurs avant de soumettre
     setErrors({ name: "", email: "", password: "" });

    try {
      const response = await axios.post(apiUrl + "/signup", { name, email, password });
      localStorage.setItem("token", response.data.token); // Sauvegarder le token dans le localStorage
      console.log("Inscription réussie !");
      navigate("/");
    } catch (error) {
      if (error.response) {
        // Si le backend a répondu avec une erreur, on met à jour l'état des erreurs
        const { field, message } = error.response.data;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: message,
        }));
      } else {
        // Si la réponse du backend est indisponible
        setErrors({ ...errors, general: "Erreur serveur. Veuillez réessayer." });
      }
      console.error("Erreur lors de l'inscription", error);
    }
  };

return(
  <>
    <Link to="../" className="absolute top-0 left-4 flex items-center mt-3 text-gray-600 hover:text-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
        Retour
    </Link>


  <div className="flex items-center mt-16 justify-center">
  
    <div class="form-container">  
      <div class="logo-container">
        Espace Inscription
      </div>

      <form class="form" onSubmit={Submit}>
        <div class="form-group">
          
          <label for="email">Prénom</label>
          <input type="text" id="name" name="name" placeholder="Entrez votre Prénom" value={name} onChange={(e) => setName(e.target.value)} required=""/>
          {errors.name && <p className="error-text">{errors.name}</p>} {/* Affiche l'erreur de prénom */}

          <label for="email">Email</label> 
          <input type="text" id="email" name="email" placeholder="Entrez votre Email" value={email} onChange={(e) => setEmail(e.target.value)} required=""/>
          {errors.email && <p className="error-text">{errors.email}</p>} {/* Affiche l'erreur d'email */}

          <label for="email">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Entrez votre Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
          {errors.password && <p className="error-text">{errors.password}</p>} {/* Affiche l'erreur de mot de passe */}
        </div>

        {errors.general && <p className="error-text">{errors.general}</p>} {/* Affiche une erreur générale */}

        <button class="form-submit-btn" type="submit">S'inscrire</button>
      </form>

      <p class="signup-link">
        Vous avez un compte ?
        <Link to="/login">Connectez vous</Link>
      </p>
    </div>

</div>

    </>
    )
}