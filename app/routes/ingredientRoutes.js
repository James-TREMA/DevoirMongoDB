// Importation du module express
const express = require('express');
// Création d'un nouveau routeur Express
const router = express.Router();

// Importation du contrôleur d'ingrédients
const ingredientController = require('../controllers/ingredientController');

// Route GET pour récupérer tous les ingrédients
// Lorsqu'un utilisateur accède à l'URL racine des ingrédients, la fonction getAllIngredients du contrôleur est appelée
router.get('/', ingredientController.getAllIngredients);

// Route POST pour créer un nouvel ingrédient
// Lors de la soumission d'un formulaire à l'URL racine des ingrédients, la fonction createIngredient du contrôleur est appelée
router.post('/', ingredientController.createIngredient);

// Route GET pour récupérer un ingrédient spécifique par son ID
// Utilise des paramètres dynamiques (':id') pour identifier l'ingrédient spécifique
router.get('/:id', ingredientController.getIngredientById);

// Route PUT pour mettre à jour un ingrédient spécifique par son ID
// Permet de modifier les informations d'un ingrédient existant
router.put('/:id', ingredientController.updateIngredientById);

// Route DELETE pour supprimer un ingrédient spécifique par son ID
// Permet de supprimer un ingrédient de la base de données
router.delete('/:id', ingredientController.deleteIngredientById);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
