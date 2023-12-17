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
4. Voici les seules données ajoutées directement dans MongoDB. Toutes les autres données doivent être ajoutées via le site web :
    ```
    // Sélection de la base de données
    use db_base

    // Création des collections
    db.createCollection("commentaires")
    db.createCollection("recettes")
    db.createCollection("ingredients")
    db.createCollection("categories")
    db.createCollection("users")

    // Insertion d'un exemple de commentaire
    db.commentaires.insert({
        texte: "Vraiment délicieux, j'ai adoré cette recette !",
        auteur: ObjectId("identifiant_de_l_auteur"),
        recette: ObjectId("identifiant_de_la_recette"),
        datePoste: new Date("2023-12-14T00:00:00Z")
    })

    // Insertion d'un exemple d'ingrédient
    db.ingredients.insert({
        nom: "Carotte",
        description: "Racine orange croquante, très appréciée en cuisine.",
        quantite: "500 g"
    })

    // Insertion d'un exemple de catégorie
    db.categories.insert({
        nom: "Soupes",
        description: "Des soupes nourrissantes pour tous les goûts."
    })
    ```
5. Démarrez le serveur :
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

## Page accueil
![Page accueil](https://image.noelshack.com/fichiers/2023/50/7/1702837398-page-accuiel.png)

## Page d'inscription
![Inscription](https://image.noelshack.com/fichiers/2023/50/7/1702837620-inscription.png)

## Page connexion
![Page connexion](https://image.noelshack.com/fichiers/2023/50/7/1702837718-connexion.png)

## Page Recettes
![Page connexion](https://gyazo.com/0e58414e8b150824240a2e592d515ade)