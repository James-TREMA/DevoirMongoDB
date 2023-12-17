// Importation des modules nécessaires
require('dotenv').config(); // Charge les variables d'environnement depuis un fichier .env
const express = require('express');
const mongoose = require('mongoose'); // ORM pour interagir avec MongoDB
const session = require('express-session'); // Gestion des sessions
const flash = require('connect-flash'); // Messages flash
const path = require('path'); // Manipulation des chemins de fichiers
const passport = require('passport'); // Authentification
const LocalStrategy = require('passport-local').Strategy; // Stratégie d'authentification locale
const bcrypt = require('bcrypt'); // Cryptage des mots de passe
const User = require('./app/models/userModel'); // Modèle d'utilisateur Mongoose
const methodOverride = require('method-override'); // Override des méthodes HTTP pour les formulaires

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données MongoDB
const dbURL = process.env.DB_URL;
const connectDB = async () => {
  try {
      await mongoose.connect(dbURL);
      console.log('Connecté à MongoDB avec Mongoose');
  } catch (error) {
      console.error('Erreur de connexion à MongoDB:', error);
      process.exit(1);
  }
};
connectDB();

// Middleware pour analyser le JSON et les données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Mettez à `true` si vous êtes sur HTTPS
}));

// Configuration de Passport pour l'authentification
passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user || !await bcrypt.compare(password, user.motDePasse)) {
        return done(null, false, { message: 'Votre email ou votre mot de passe est incorrect. Veuillez réessayer.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Configuration de connect-flash pour les messages flash
app.use(flash());

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

// Configuration du dossier pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'app', 'public', 'uploads')));

// Définir le moteur de vue EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Utilisation de method-override pour supporter PUT et DELETE dans les formulaires
app.use(methodOverride('_method'));

// Importation et utilisation des routes
const utilisateursRouter = require('./app/routes/userRoutes');
const recettesRouter = require('./app/routes/recetteRoutes');
const ingredientsRouter = require('./app/routes/ingredientRoutes');
const commentairesRouter = require('./app/routes/commentaireRoutes');
const categoriesRouter = require('./app/routes/cathegorieRoutes');
app.use('/utilisateurs', utilisateursRouter);
app.use('/recettes', recettesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/commentaires', commentairesRouter);
app.use('/categories', categoriesRouter);

// Route de base pour afficher la page d'accueil
app.get('/', (req, res) => {
  res.render('accueil', { user: req.user });
});

// Gestion des erreurs 404 pour les routes non trouvées
app.use((req, res, next) => {
    res.status(404).send("Désolé, page non trouvée !");
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Quelque chose s\'est mal passé !');
});

// Démarrage du serveur sur le port spécifié
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
