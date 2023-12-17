// Importation du module express
const express = require('express');
// Création d'un nouveau routeur Express
const router = express.Router();

// Importation du contrôleur d'utilisateurs
const userController = require('../controllers/userController');
// Importation du middleware pour vérifier si un utilisateur est authentifié
const isAuthenticated = require('../middleware/isAuthenticated'); // Assurez-vous que le chemin vers 'isAuthenticated' est correct

// Route GET pour afficher le formulaire d'inscription
router.get('/inscription', userController.showRegistrationForm);

// Route POST pour traiter le formulaire d'inscription
router.post('/inscription', userController.createUser);

// Route GET pour afficher le formulaire de connexion
router.get('/connexion', userController.showConnexionForm);

// Route POST pour traiter le formulaire de connexion
router.post('/connexion', userController.login);

// Route GET pour la déconnexion de l'utilisateur
router.get('/deconnexion', userController.deconnexion);

// Routes avec paramètres pour les opérations CRUD sur les utilisateurs
// Ces routes nécessitent d'avoir l'ID de l'utilisateur dans l'URL

// Route GET pour obtenir un utilisateur par son ID
router.get('/:id', isAuthenticated, userController.getUserById);

// Route PUT pour mettre à jour un utilisateur par son ID
router.put('/:id', isAuthenticated, userController.updateUserById);

// Route DELETE pour supprimer un utilisateur par son ID
router.delete('/:id', isAuthenticated, userController.deleteUserById);

// Route GET pour obtenir tous les utilisateurs
// Cette route est typiquement utilisée pour afficher une liste d'utilisateurs dans une interface d'administration
router.get('/', isAuthenticated, userController.getAllUsers);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
