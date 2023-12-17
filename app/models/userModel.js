// Importation du module mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');

// Définition d'un schéma Mongoose pour les utilisateurs
const userSchema = new mongoose.Schema({
    // Champ 'nom' pour le nom de l'utilisateur
    nom: {
        type: String, // Le type est une chaîne de caractères
        required: true // Ce champ est obligatoire
    },
    // Champ 'email' pour l'adresse e-mail de l'utilisateur
    email: {
        type: String, // Le type est une chaîne de caractères
        required: true, // Ce champ est obligatoire
        unique: true // Cet e-mail doit être unique dans la base de données
    },
    // Champ 'motDePasse' pour le mot de passe de l'utilisateur
    motDePasse: {
        type: String, // Le type est une chaîne de caractères
        required: true // Ce champ est obligatoire
    },
    // Champ 'role' pour définir le rôle de l'utilisateur (par exemple, utilisateur ou administrateur)
    role: {
        type: String, // Le type est une chaîne de caractères
        default: 'user' // Valeur par défaut est 'user'. Peut être changé en 'admin' ou autre selon les besoins
    }
    // Vous pouvez ajouter d'autres champs selon les besoins de votre application, comme l'adresse, le numéro de téléphone, etc.
});

// Création d'un modèle Mongoose 'User' à partir du schéma défini ci-dessus
// Ce modèle permet d'interagir avec la collection 'Users' dans MongoDB
const User = mongoose.model('User', userSchema);

// Exportation du modèle 'User' pour l'utiliser dans d'autres fichiers de l'application
module.exports = User;
