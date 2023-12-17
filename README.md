# DevoirMongoDB

## Description
Ce projet est une application web Node.js utilisant Express et MongoDB. Elle permet de gérer des recettes, des ingrédients, des commentaires, des catégories, et des utilisateurs. Voici les fonctionnalités clés :

- **Gestion des utilisateurs** : Inscription, connexion, et déconnexion avec gestion de sessions.
- **CRUD pour les recettes** : Création, lecture, mise à jour, et suppression des recettes.
- **Gestion des ingrédients** : Ajout et modification d'ingrédients associés aux recettes.
- **Gestion des catégories** : Catégorisation des recettes pour une organisation facile.
- **Commentaires sur les recettes** : Permet aux utilisateurs de laisser des commentaires sur les recettes.

## Installation

### Prérequis
- Node.js
- MongoDB

### Configuration
1. Clonez le dépôt :
    ```
    git clone [URL_DU_DEPOT]
    ```
2. Installez les dépendances :
    ```
    npm install
    ```
3. Créez un fichier `.env` à la racine du projet et configurez vos variables d'environnement :
    ```
    DB_URL=votre_chaine_de_connexion_mongodb
    SESSION_SECRET=votre_secret_de_session
    PORT=3000
    ```
4. Démarrez le serveur :
    ```
    node server.js
    ```

## Structure du Projet

```
projet/
│
├── app/
│   ├── controllers/    - Logique de contrôle pour les routes.
│   ├── models/         - Modèles Mongoose pour MongoDB.
│   ├── routes/         - Définition des routes Express.
│   └── views/          - Fichiers EJS pour l'interface utilisateur.
│
├── public/             - Fichiers statiques (CSS, JS, images).
├── views/              - Fichiers EJS pour les vues principales.
├── .env                - Fichier de configuration des variables d'environnement.
├── server.js           - Point d'entrée principal de l'application.
└── package.json        - Métadonnées et dépendances du projet.
```

## Technologies Utilisées

- **Backend** : Node.js, Express
- **Base de Données** : MongoDB avec Mongoose
- **Frontend** : HTML, CSS, EJS
- **Authentification** : Passport.js
- **Sécurité** : bcrypt pour le hachage des mots de passe
- **Sessions** : express-session

## Contribution

Les contributions à ce projet sont les bienvenues. Pour contribuer :

1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/amazing-feature`).
3. Committez vos changements (`git commit -m 'Ajout de quelque chose d'incroyable'`).
4. Poussez la branche (`git push origin feature/amazing-feature`).
5. Ouvrez une Pull Request.

## Licence

Open Source no licence.