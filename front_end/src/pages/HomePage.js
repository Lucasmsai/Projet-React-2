import React, { useEffect, useState } from 'react';
import Ajoutuser from '../composants/Ajoutuser/Ajoutuser.js';
import { Parallax } from 'react-parallax';
import axios from 'axios';
import jwtDecode from "jwt-decode";

export default function HomePage(){




  const [users, setUsers] = useState([]);

  // URL de l'API (assurez-vous de définir apiUrl correctement)
  
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    axios
      .get(apiUrl + '/userget')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);

  return (
    <>



    <div className="bg-neutral-600">
      {/* Section Ajoutuser */}
      <div className="flex justify-center p-16">
        <Ajoutuser />
      </div>

      {/* Liste des utilisateurs */}
      <div className="text-white p-4">
        <h2 className="text-xl font-bold mb-4">Liste des utilisateurs :</h2>
        <ul className="list-disc pl-5 space-y-2">
          {users.map((user) => (
            <li key={user.id}>
              <span className="font-semibold">{user.nom}</span> - {user.email}
            </li>
          ))}
        </ul>
      </div>

      {/* Section Parallax */}
      <Parallax
        className="h-[300vh]"
        bgImage="https://resize.elle.fr/original/var/plain_site/storage/images/deco/news-tendances/une-ville-une-architecture-miami-et-le-style-art-deco/94226926-1-fre-FR/Une-ville-une-architecture-Miami-et-le-style-Art-Deco.jpg"
        strength={400}
        blur={{ min: -5, max: 10 }}
      >
        <div className="text-center text-white p-16">
          <h1 className="text-4xl font-bold mb-4">Section Parallax</h1>
          <p className="text-lg">
            Vous pouvez ajouter du contenu supplémentaire selon vos besoins.
          </p>
        </div>
      </Parallax>

      {/* Bouton Explore */}
      <div className="flex justify-center p-8">
        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          <svg
            className="svgIcon mr-2"
            viewBox="0 0 512 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
          </svg>
          Explore
        </button>
      </div>
    </div>
    </>
  );
};
