const mongoose = require('mongoose');

const ShemaUser = new mongoose.Schema({
    nom: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
    },
    mdp: {
        type: String,
        required : true,
    }
});

const User = mongoose.model("User", ShemaUser);

module.exports = User;