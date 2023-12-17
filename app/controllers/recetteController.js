const Recette = require('../models/recetteModel');
const Ingredient = require('../models/ingredientModel');
const path = require('path');
const fs = require('fs');
const util = require('util');
const fsRename = util.promisify(fs.rename); // Convertit fs.rename en fonction qui retourne une promesse

// Récupérer toutes les recettes
exports.getAllRecettes = async (req, res) => {
    try {
        // Rechercher toutes les recettes et peupler leurs ingrédients associés
        const recettes = await Recette.find().populate('ingredients');
        res.json(recettes);
    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une nouvelle recette
exports.addRecette = async (req, res) => {
    try {
        // Séparation et nettoyage des noms d'ingrédients
        const ingredientNames = req.body.ingredients.split(',').map(name => name.trim());
        
        // Récupération des ID des ingrédients existants ou gestion des erreurs si non trouvés
        const ingredientIds = await Promise.all(
            ingredientNames.map(name =>
                Ingredient.findOne({ nom: name }).then(ingredient => {
                    if (!ingredient) throw new Error(`Ingrédient non trouvé: ${name}`);
                    return ingredient._id;
                })
            )
        );

        // Création de la nouvelle recette
        let newRecette = new Recette({
            titre: req.body.titre,
            description: req.body.description,
            ingredients: ingredientIds,
            tempsPreparation: parseInt(req.body.tempsPreparation),
        });

        // Enregistrement de la nouvelle recette
        newRecette = await newRecette.save();

        // Gestion de l'image téléchargée, si présente
        if (req.file) {
            const tempPath = req.file.path;
            const fileExtension = path.extname(req.file.originalname);
            const newFilename = `${newRecette._id}${fileExtension}`;
            const newPath = path.join(__dirname, '..', 'public', 'uploads', newFilename);

            try {
                // Renommage du fichier pour le lier à l'ID de la recette
                await fsRename(tempPath, newPath);
                newRecette.imagePath = `/uploads/${newFilename}`;
                await newRecette.save();
            } catch (err) {
                console.error('Erreur lors du renommage du fichier : ', err);
                return res.status(500).send('Erreur lors du traitement de l\'image');
            }
        }

        // Redirection vers la liste des recettes après l'ajout
        res.redirect('/recettes');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'ajout de la recette : " + error.message);
    }
};

// Récupérer toutes les recettes pour l'affichage
exports.getAllRecettes = async (req, res) => {
    try {
        const recettes = await Recette.find();
        res.render('recettes', { 
            recettes,
            query: req.query // Transmettre l'objet de requête à la vue EJS pour la gestion des requêtes
        });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des recettes');
    }
};

// Obtenir une recette par son ID
exports.getRecetteById = async (req, res) => {
    try {
        const recette = await Recette.findById(req.params.id).populate('ingredients');
        if (recette) {
            res.json(recette);
        } else {
            res.status(404).json({ message: 'Recette non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une recette par son ID
exports.updateRecetteById = async (req, res) => {
    try {
        const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (recette) {
            res.json(recette);
        } else {
            res.status(404).json({ message: 'Recette non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une recette par son ID
exports.deleteRecetteById = async (req, res) => {
    try {
        const recette = await Recette.findById(req.params.id);

        if (!recette) {
            return res.status(404).send('Recette non trouvée');
        }

        // Construction du chemin de l'image associée à la recette
        const imagePath = path.join(__dirname, '..', 'public', 'uploads', recette._id + '.jpg'); // Vérifier l'extension

        // Suppression du fichier image s'il existe
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, err => {
                if (err) {
                    console.error('Erreur lors de la suppression du fichier image : ', err);
                } else {
                    console.log('Image supprimée avec succès');
                }
            });
        }

        // Suppression de la recette de la base de données
        await Recette.findByIdAndDelete(recette._id);

        // Redirection vers la liste des recettes après la suppression
        res.redirect('/recettes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression de la recette');
    }
};

// Afficher le formulaire d'ajout de recette
exports.showAddRecetteForm = (req, res) => {
    res.render('ajouter_recette');
};
