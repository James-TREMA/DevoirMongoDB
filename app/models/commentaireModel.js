// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Création d'un nouveau schéma Mongoose pour les commentaires
const commentaireSchema = new mongoose.Schema({
    // Champ pour l'auteur du commentaire, faisant référence à un utilisateur
    auteur: {
        type: mongoose.Schema.Types.ObjectId, // Utilise l'ID d'objet de MongoDB pour référencer un utilisateur
        ref: 'utilisateur', // Référence au modèle 'utilisateur'
        required: true // Ce champ est obligatoire
    },
    // Champ pour la recette associée au commentaire
    recette: {
        type: mongoose.Schema.Types.ObjectId, // Utilise l'ID d'objet de MongoDB pour référencer une recette
        ref: 'Recette', // Référence au modèle 'Recette'
        required: true // Ce champ est obligatoire
    },
    // Champ pour le texte du commentaire
    texte: {
        type: String, // Type de données du champ est une chaîne de caractères
        required: true // Ce champ est obligatoire
    },
    // Champ pour la date de publication du commentaire
    datePoste: {
        type: Date, // Utilise le type de données Date de JavaScript
        default: Date.now // Valeur par défaut est la date et l'heure actuelles
    }
    // Vous pouvez ajouter d'autres champs ici si nécessaire, comme une évaluation, un indicateur de spam, etc.
});

// Création d'un modèle Mongoose à partir du schéma ci-dessus
// Le modèle 'Commentaire' représente une collection dans MongoDB
const Commentaire = mongoose.model('Commentaire', commentaireSchema);

// Exportation du modèle 'Commentaire' pour l'utiliser dans d'autres parties de l'application
module.exports = Commentaire;
