const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require("./models/mongo.js");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("Utilisateur n'existe pas:");
            return res.status(400).json({ field: "email", message: "Cet utilisateur n'existe pas" });
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            console.log("Mot de passe invalide:");
            return res.status(400).json({ field: "password", message: "Mot de passe incorrect" });
        }

        // Génération d'un token JWT
        const token = jwt.sign(
            { userId: existingUser._id },
            "secret_key",  // Utiliser une clé secrète dans un fichier de configuration ou une variable d'environnement
            { expiresIn: "1h" }
        );

        // Réponse de succès avec le token
        res.status(200).json({ token, message: "Connexion réussie !" });

    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer." });
    }
});


app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Utilisateur existant:", existingUser);
            return res.status(400).json({ field: "email", message: "Cet email est déjà utilisé." });
        }

        // Vérification du prénom
        if (!name || name.trim().length < 2) {
            console.log("Prénom invalide:", name);
            return res.status(400).json({ field: "name", message: "Le prénom doit comporter au moins 2 caractères." });
        }

        // Vérification du mot de passe
        if (!password || password.length < 8) {
            console.log("Mot de passe invalide:", password);
            return res.status(400).json({ field: "password", message: "Le mot de passe doit comporter au moins 8 caractères." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Génération d'un token JWT
        const token = jwt.sign(
            { userId: newUser._id },
            "secret_key",  // Utiliser une clé secrète dans un fichier de configuration ou une variable d'environnement
            { expiresIn: "1h" }
        );

        // Réponse de succès avec le token
        res.status(201).json({ token, message: "Inscription réussie !" });

    } catch (error) {
        console.error("Erreur lors de l'inscription", error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer." });
    }
});



const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Accès refusé" });

    try {
        const decoded = jwt.verify(token, "secret_key");
        req.user = decoded; // Ajoute l'ID utilisateur au `req`
        next();
    } catch (error) {
        res.status(403).json({ message: "Token invalide ou expiré" });
    }
};

app.get("/api/profile", authenticateToken, async (req, res) => {
    try {
        // Récupérer l'utilisateur grâce à l'ID extrait du token
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});





app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/api/userget", async (req,res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
});

mongoose
 .connect(
    "mongodb+srv://Juizzy:dO8j4ZaWKzLkAUzg@test.6qzca.mongodb.net/?retryWrites=true&w=majority&appName=DBBD"
 )
 .then(() => console.log("Connected!"))
 .catch(() => console.log("Failed!"));

app.post("/api/userpost", async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
});

app.listen(3001, () => {
    console.log("connecté mon gaté");
});