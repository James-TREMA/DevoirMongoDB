// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Création d'un nouveau schéma Mongoose pour les catégories
const categorieSchema = new mongoose.Schema({
    // Définition du champ 'nom' pour la catégorie
    nom: {
        type: String, // Type de données du champ est une chaîne de caractères
        required: true, // Ce champ est obligatoire
        unique: true // Assure que chaque nom de catégorie est unique dans la collection
    }
    // Vous pouvez ajouter d'autres champs ici si nécessaire, comme une description, une image, etc.
    // Par exemple : description: { type: String }
});

// Création d'un modèle Mongoose à partir du schéma ci-dessus
// Le modèle représente une collection dans MongoDB et permet d'interagir avec celle-ci
const Categorie = mongoose.model('Categorie', categorieSchema);

// Exportation du modèle 'Categorie' pour l'utiliser dans d'autres parties de l'application
module.exports = Categorie;
