const Categorie = require('../models/categorieModel');

// Obtenez toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        // Recherche de toutes les catégories dans la base de données
        const categories = await Categorie.find();
        // Envoie les catégories au client
        res.json(categories);
    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Créez une nouvelle catégorie
exports.createCategorie = async (req, res) => {
    // Création d'une nouvelle instance de catégorie avec les données reçues
    const categorie = new Categorie({
        nom: req.body.nom
        // ajoutez d'autres champs ici si nécessaire
    });

    try {
        // Enregistrement de la nouvelle catégorie dans la base de données
        const newCategorie = await categorie.save();
        // Envoie la catégorie créée au client
        res.status(201).json(newCategorie);
    } catch (error) {
        // Gestion des erreurs de validation ou autres
        res.status(400).json({ message: error.message });
    }
};

// Obtenez une catégorie par son ID
exports.getCategorieById = async (req, res) => {
    try {
        // Recherche d'une catégorie par son ID
        const categorie = await Categorie.findById(req.params.id);
        if (categorie) {
            // Si la catégorie est trouvée, l'envoyer au client
            res.json(categorie);
        } else {
            // Si la catégorie n'est pas trouvée, envoyer un message d'erreur
            res.status(404).json({ message: 'Catégorie non trouvée' });
        }
    } catch (error) {
        // Gestion des erreurs de serveur
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une catégorie par son ID
exports.updateCategorieById = async (req, res) => {
    try {
        // Mise à jour de la catégorie avec les nouvelles données reçues
        const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (categorie) {
            // Si la catégorie est mise à jour avec succès, l'envoyer au client
            res.json(categorie);
        } else {
            // Si la catégorie n'est pas trouvée, envoyer un message d'erreur
            res.status(404).json({ message: 'Catégorie non trouvée' });
        }
    } catch (error) {
        // Gestion des erreurs de validation ou autres
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une catégorie par son ID
exports.deleteCategorieById = async (req, res) => {
    try {
        // Suppression de la catégorie spécifiée
        const categorie = await Categorie.findByIdAndDelete(req.params.id);
        if (categorie) {
            // Confirmer la suppression au client
            res.json({ message: 'Catégorie supprimée' });
        } else {
            // Si la catégorie n'est pas trouvée, envoyer un message d'erreur
            res.status(404).json({ message: 'Catégorie non trouvée' });
        }
    } catch (error) {
        // Gestion des erreurs de serveur
        res.status(500).json({ message: error.message });
    }
}; 
