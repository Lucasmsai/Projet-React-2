import './App.css';
import Ajoutuser from './composants/Ajoutuser/Ajoutuser.js';
import { Parallax } from 'react-parallax';
import axios from "axios";
import { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function App() {
  // Methode Get, Recevoir les User
  const [users, setusers] = useState([]);
  useEffect(() => {
    axios
    .get(apiUrl + "/userget")
    .then((res) => {
      setusers(res.data);
    })
    .catch((error) => {
      console.error("erreur", error);
    });
  }, []);

  


  return (
    <>
      <div className="bg-neutral-600">
      <div className='flex justify-center p-16'>
      < Ajoutuser />

      </div>
      
      <div className='text-black'>
      {users.map((user) => (
          <span key={user.id}> {/* Ajout d'une clé unique ici pour React */}
            {user.nom} - {user.email} - {user.mdp}
          </span>
        ))}
      </div>
      

      <Parallax 
        className="h-[300vh]"
        bgImage="https://resize.elle.fr/original/var/plain_site/storage/images/deco/news-tendances/une-ville-une-architecture-miami-et-le-style-art-deco/94226926-1-fre-FR/Une-ville-une-architecture-Miami-et-le-style-Art-Deco.jpg"
        strength={400}
        blur={{ min: -5, max: 10 }}
      >
          <h1>Section Parallax 2</h1>
      
              <h1>Votre contenu commence ici après un espace vide.</h1>
                <p>
                  Vous pouvez ajouter du contenu supplémentaire selon vos besoins.
                </p>
      </Parallax>
      <button class="button">
   <svg class="svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
  Explore
</button>

      </div>
    </>
    
  );
}

export default App;