// Importation du module express
const express = require('express');
// Création d'un nouveau routeur Express
const router = express.Router();

// Importation du contrôleur de catégories
const categorieController = require('../controllers/cathegorieController');

// Route GET pour récupérer toutes les catégories
// Lorsqu'un utilisateur accède à l'URL racine de la catégorie, la fonction getAllCategories du contrôleur est exécutée
router.get('/', categorieController.getAllCategories);

// Route POST pour créer une nouvelle catégorie
// Lors de la soumission d'un formulaire à l'URL racine de la catégorie, la fonction createCategorie du contrôleur est exécutée
router.post('/', categorieController.createCategorie);

// Route GET pour récupérer une catégorie spécifique par son ID
// Utilise des paramètres dynamiques (':id') pour identifier la catégorie spécifique
router.get('/:id', categorieController.getCategorieById);

// Route PUT pour mettre à jour une catégorie spécifique par son ID
// Permet de modifier les informations d'une catégorie existante
router.put('/:id', categorieController.updateCategorieById);

// Route DELETE pour supprimer une catégorie spécifique par son ID
// Permet de supprimer une catégorie de la base de données
router.delete('/:id', categorieController.deleteCategorieById);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
