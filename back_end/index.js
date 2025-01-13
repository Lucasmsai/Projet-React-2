const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require("./models/mongo.js");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();

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