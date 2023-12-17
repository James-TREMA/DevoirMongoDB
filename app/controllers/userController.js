const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        // Rechercher tous les utilisateurs dans la base de données
        const users = await User.find();
        res.json(users);
    } catch (error) {
        // Gestion des erreurs et envoi d'une réponse d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        // Hachage du mot de passe avant stockage
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('Mot de passe haché avec succès : ' + hashedPassword);

        // Création de l'objet utilisateur avec les informations fournies
        const user = new User({
            nom: req.body.nom,
            email: req.body.email,
            motDePasse: hashedPassword,
            role: req.body.role || 'user'
        });

        console.log('Utilisateur créé avec succès : ' + user);

        // Enregistrement du nouvel utilisateur dans la base de données
        await user.save();
        console.log('Utilisateur enregistré avec succès');
        // Redirection vers la page de connexion après l'inscription
        res.redirect('/utilisateurs/connexion');
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.redirect('/utilisateurs/inscription?error=' + encodeURIComponent('Erreur lors de la création de l\'utilisateur'));
    }
};

// Gérer le processus de connexion
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/utilisateurs/connexion',
        failureFlash: true // Afficher les messages d'erreur lors de l'échec de la connexion
    })(req, res, next);
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Afficher le formulaire de connexion
exports.showConnexionForm = (req, res) => {
    res.render('connexion', { messages: { error: req.flash('error') } });
};

// Mettre à jour un utilisateur par son ID
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur par son ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'Utilisateur supprimé' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Afficher le formulaire d'inscription
exports.showRegistrationForm = (req, res) => {
    res.render('inscription');
};

// Afficher le formulaire de connexion
exports.showConnexionForm = (req, res) => {
    res.render('connexion', { messages: { error: req.flash('error') } });
};

// Gérer la déconnexion de l'utilisateur
exports.deconnexion = (req, res) => {
    if (req.user) {
        console.log("L'utilisateur " + req.user.nom + " est déconnecté");
    }
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('http://localhost:3000');
    });
};
