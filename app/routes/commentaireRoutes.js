// Importation du module express
const express = require('express');
// Création d'un nouveau routeur Express
const router = express.Router();

// Importation du contrôleur de commentaires
const commentaireController = require('../controllers/commentaireController');

// Route GET pour récupérer tous les commentaires
// Lorsqu'un utilisateur accède à l'URL racine des commentaires, la fonction getAllCommentaires du contrôleur est appelée
router.get('/', commentaireController.getAllCommentaires);

// Route POST pour créer un nouveau commentaire
// Lors de la soumission d'un formulaire à l'URL racine des commentaires, la fonction createCommentaire du contrôleur est appelée
router.post('/', commentaireController.createCommentaire);

// Route GET pour récupérer un commentaire spécifique par son ID
// Utilise des paramètres dynamiques (':id') pour identifier le commentaire spécifique
router.get('/:id', commentaireController.getCommentaireById);

// Route PUT pour mettre à jour un commentaire spécifique par son ID
// Permet de modifier les informations d'un commentaire existant
router.put('/:id', commentaireController.updateCommentaireById);

// Route DELETE pour supprimer un commentaire spécifique par son ID
// Permet de supprimer un commentaire de la base de données
router.delete('/:id', commentaireController.deleteCommentaireById);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
