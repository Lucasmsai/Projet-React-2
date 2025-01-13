import React from 'react';
import "./Ajoutuser.css";
import axios from "axios";
import { useEffect, useState } from 'react';
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export default function Ajoutuser() {
// Methode Post, envoyer des User
const [email, setEmail] = useState("");
const [nom, setNom] = useState("");
const [mdp, setMdp] = useState("");
async function submit(e){
    e.preventDefault();
    try{
      const response = await axios
        .post(apiUrl + "/userpost", {nom: nom, email: email, mdp: mdp});
        window.location.reload()
      }
    catch (error) {
      if (error.response){
        alert(error.response.data.message);
      }
    }
  }
return (
    <>
    <form class="form">
  <span class="input-span">
    <label for="nom" class="label">Nom</label>
    <input type="nom" name="nom" id="nom" onChange={(e) => setNom(e.target.value)}/>
    </span>
  <span class="input-span">
    <label for="mdp" class="label">password</label>
    <input type="mdp" name="mdp" id="mdp" onChange={(e) => setMdp(e.target.value)}
  /></span>
  <span class="input-span">
    <label for="email" class="label">Email</label>
    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
  /></span>

  <button onClick={submit} type="submit" >Envoyer</button>
</form>
</>
  )
}