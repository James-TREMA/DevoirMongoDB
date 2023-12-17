const Ingredient = require('../models/ingredientModel');

// Récupérer tous les ingrédients
exports.getAllIngredients = async (req, res) => {
    try {
        // Rechercher tous les ingrédients dans la base de données
        const ingredients = await Ingredient.find();
        // Rendre la vue 'ingredient' avec la liste des ingrédients
        res.render('ingredient', { ingredients });
    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse d'erreur
        res.status(500).send('Erreur lors de la récupération des ingrédients');
    }
};

// Créer un nouvel ingrédient
exports.createIngredient = async (req, res) => {
    // Créer une nouvelle instance d'ingrédient avec les données du corps de la requête
    const ingredient = new Ingredient({
        nom: req.body.nom
        // ajoutez d'autres champs ici si nécessaire
    });

    try {
        // Enregistrement du nouvel ingrédient dans la base de données
        const newIngredient = await ingredient.save();
        // Envoyer l'ingrédient créé au client
        res.status(201).json(newIngredient);
    } catch (error) {
        // Gestion des erreurs de validation ou autres
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un ingrédient par son ID
exports.getIngredientById = async (req, res) => {
    try {
        // Rechercher l'ingrédient par son ID
        const ingredient = await Ingredient.findById(req.params.id);
        if (ingredient) {
            // Si l'ingrédient est trouvé, l'envoyer au client
            res.json(ingredient);
        } else {
            // Si l'ingrédient n'est pas trouvé, envoyer un message d'erreur
            res.status(404).json({ message: 'Ingrédient non trouvé' });
        }
    } catch (error) {
        // Gestion des erreurs de serveur
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un ingrédient par son ID
exports.updateIngredientById = async (req, res) => {
    try {
        // Mise à jour de l'ingrédient avec les nouvelles données reçues
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (ingredient) {
            // Si l'ingrédient est mis à jour avec succès, l'envoyer au client
            res.json(ingredient);
        } else {
            // Si l'ingrédient n'est pas trouvé, envoyer un message d'erreur
            res.status(404).json({ message: 'Ingrédient non trouvé' });
        }
    } catch (error) {
        // Gestion des erreurs de validation ou autres
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un ingrédient par son ID
exports.deleteIngredientById = async (req, res) => {
    try {
        // Supprimer l'ingrédient spécifié
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (ingredient) {
            // Confirmer la suppression au client
            res.json({ message: 'Ingrédient supprimé' });
        } else {
            // Si l'ingrédient n'est pas trouvé, envoyer un message d'erreur
            res.status(404).json({ message: 'Ingrédient non trouvé' });
        }
    } catch (error) {
        // Gestion des erreurs de serveur
        res.status(500).json({ message: error.message });
    }
};
