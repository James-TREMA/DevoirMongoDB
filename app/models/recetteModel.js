// Importation du module mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');

// Définition d'un schéma Mongoose pour les recettes
const recetteSchema = new mongoose.Schema({
    // Champ 'titre' pour le titre de la recette
    titre: {
        type: String, // Le type est une chaîne de caractères
        required: true // Ce champ est obligatoire
    },
    // Champ 'description' pour une description détaillée de la recette
    description: String, // Type String, champ optionnel

    // Champ 'ingredients' pour stocker une liste d'ingrédients
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId, // Référence à des ID d'objets dans MongoDB
        ref: 'Ingredient' // Référence au modèle 'Ingredient'
    }],
    
    // Champ 'tempsPreparation' pour indiquer le temps de préparation de la recette
    tempsPreparation: Number, // Type Number, champ optionnel

    // Champ 'imagePath' pour stocker le chemin d'accès à une image associée à la recette
    imagePath: String // Type String, champ optionnel
    // Vous pouvez ajouter d'autres champs si nécessaire, tels que le temps de cuisson, la catégorie, etc.
});

// Création d'un modèle Mongoose 'Recette' à partir du schéma défini ci-dessus
// Ce modèle permet d'interagir avec la collection 'Recettes' dans MongoDB
const Recette = mongoose.model('Recette', recetteSchema);

// Exportation du modèle 'Recette' pour l'utiliser dans d'autres fichiers de l'application
module.exports = Recette;
