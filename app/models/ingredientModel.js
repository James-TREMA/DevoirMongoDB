// Importation du module mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');

// Définition d'un schéma Mongoose pour les ingrédients
const ingredientSchema = new mongoose.Schema({
    // Champ 'nom' pour le nom de l'ingrédient
    nom: {
        type: String, // Le type est une chaîne de caractères
        required: true // Ce champ est obligatoire
    },
    // Champ 'description' pour une description de l'ingrédient
    description: {
        type: String, // Le type est une chaîne de caractères
        required: true // Ce champ est obligatoire
    },
    // Champ 'quantite' pour spécifier la quantité habituelle ou recommandée de l'ingrédient
    quantite: {
        type: String, // Le type est une chaîne de caractères
        required: true // Ce champ est obligatoire
    }
    // Vous pouvez ajouter d'autres champs si nécessaire, tels que le prix, la provenance, etc.
});

// Création d'un modèle Mongoose 'Ingredient' à partir du schéma défini ci-dessus
// Ce modèle permet d'interagir avec la collection 'Ingredients' dans MongoDB
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

// Exportation du modèle 'Ingredient' pour l'utiliser dans d'autres fichiers de l'application
module.exports = Ingredient;
