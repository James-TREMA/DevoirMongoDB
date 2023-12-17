const Commentaire = require('../models/commentaireModel');

// Récupérer tous les commentaires
exports.getAllCommentaires = async (req, res) => {
    try {
        // Rechercher tous les commentaires dans la base de données
        const commentaires = await Commentaire.find();
        // Envoyer les commentaires au client
        res.json(commentaires);
    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouveau commentaire
exports.createCommentaire = async (req, res) => {
    // Créer une nouvelle instance de commentaire avec les données du corps de la requête
    const commentaire = new Commentaire({
        texte: req.body.texte,
        auteur: req.body.auteur,
        recette: req.body.recette
        // Ajoutez d'autres champs ici si nécessaire
    });

    try {
        // Enregistrement du nouveau commentaire dans la base de données
        const newCommentaire = await commentaire.save();
        // Envoyer le commentaire créé au client
        res.status(201).json(newCommentaire);
    } catch (error) {
        // Gestion des erreurs de validation ou autres
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un commentaire par son ID
exports.getCommentaireById = async (req, res) => {
    try {
        // Rechercher le commentaire par son ID
        const commentaire = await Commentaire.findById(req.params.id);
        if (commentaire) {
            // Si le commentaire est trouvé, l'envoyer au client
            res.json(commentaire);
        } else {
            // Si le commentaire n'est pas trouvé, envoyer un message d'erreur
            res.status(404).json({ message: 'Commentaire non trouvé' });
        }
    } catch (error) {
        // Gestion des erreurs de serveur
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un commentaire par son ID
exports.updateCommentaireById = async (req, res) => {
    try {
        // Mise à jour du commentaire avec les nouvelles données reçues
        const commentaire = await Commentaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (commentaire) {
            // Si le commentaire est mis à jour avec succès, l'envoyer au client
            res.json(commentaire);
        } else {
            // Si le commentaire n'est pas trouvé, envoyer un message d'erreur
            res.status(404).json({ message: 'Commentaire non trouvé' });
        }
    } catch (error) {
        // Gestion des erreurs de validation ou autres
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un commentaire par son ID
exports.deleteCommentaireById = async (req, res) => {
    try {
        // Supprimer le commentaire spécifié
        const commentaire = await Commentaire.findByIdAndDelete(req.params.id);
        if (commentaire) {
            // Confirmer la suppression au client
            res.json({ message: 'Commentaire supprimé' });
        } else {
            // Si le commentaire n'est pas trouvé, envoyer un message d'erreur
            res.status(404).json({ message: 'Commentaire non trouvé' });
        }
    } catch (error) {
        // Gestion des erreurs de serveur
        res.status(500).json({ message: error.message });
    }
};
