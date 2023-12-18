[<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FJames-TREMA%2FDevoirMongoDB&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visiteurs&edge_flat=false"/></a>](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FJames-TREMA%2FDevoirMongoDB&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visiteurs&edge_flat=false)
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
DevoirMongoDB/
│
├── app/
│   ├── controllers/    - Contient les fichiers de logique de contrôle pour les routes.
│   ├── middleware/     - Contient les fichiers de middleware pour les opérations comme l'authentification.
│   ├── models/         - Contient les modèles Mongoose pour l'interaction avec MongoDB.
│   ├── public/         - Contient les fichiers statiques accessibles publiquement.
│   │   └── uploads/    - Dossier pour stocker les fichiers téléchargés par les utilisateurs.
│   └── routes/         - Contient les fichiers de définition des routes Express.
│
├── views/              - Contient les fichiers EJS pour l'interface utilisateur.
│
├── .gitignore          - Spécifie les fichiers intentionnellement non suivis à ignorer par Git.
├── package-lock.json   - Verrouille automatiquement les versions de toutes les dépendances.
├── package.json        - Détaille les métadonnées et les dépendances du projet.
├── README.md           - Fournit des informations sur le projet, l'utilisation, et plus.
└── server.js           - Le point d'entrée principal de l'application Express.
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

## Page recettes
![Page connexion](https://image.noelshack.com/fichiers/2023/50/7/1702838154-liste-des-recettes.png)

## Page ajouté une recette
![Page connexion](https://image.noelshack.com/fichiers/2023/50/7/1702838218-ajouter-une-recette.png)

## Page liste des ingrédients
![Page connexion](https://image.noelshack.com/fichiers/2023/50/7/1702838348-liste-des-ingredients.png)
