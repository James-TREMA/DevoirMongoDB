// Importation du module express
const express = require('express');
// Création d'un nouveau routeur Express
const router = express.Router();

// Importation du contrôleur de recettes
const recetteController = require('../controllers/recetteController');
// Importation du middleware pour la gestion des téléchargements de fichiers
const upload = require('../middleware/upload'); // Assurez-vous que le chemin vers le middleware 'upload' est correct

// Route GET pour afficher le formulaire d'ajout d'une nouvelle recette
router.get('/ajouter', recetteController.showAddRecetteForm);

// Route POST pour ajouter une nouvelle recette avec possibilité de téléchargement d'image
// Le middleware 'upload.single('image')' gère le téléchargement d'une image pour la recette
router.post('/ajouter', upload.single('image'), recetteController.addRecette);

// Route GET pour récupérer toutes les recettes
// Accéder à cette URL renvoie une liste de toutes les recettes disponibles
router.get('/', recetteController.getAllRecettes);

// Route GET pour récupérer une recette spécifique par son ID
// Utilise des paramètres dynamiques (':id') pour identifier la recette spécifique
router.get('/:id', recetteController.getRecetteById);

// Route PUT pour mettre à jour une recette spécifique par son ID
// Permet également le téléchargement d'une nouvelle image pour la recette
router.put('/:id', upload.single('image'), recetteController.updateRecetteById);

// Route DELETE pour supprimer une recette spécifique par son ID
// Cette opération supprime la recette de la base de données
router.delete('/:id', recetteController.deleteRecetteById);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
