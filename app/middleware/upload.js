// Importation du module multer pour la gestion des téléchargements de fichiers
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des fichiers téléchargés
const storage = multer.diskStorage({
    // Définition de la destination de stockage des fichiers téléchargés
    destination: function (req, file, cb) {
        // Utiliser le chemin '../public/uploads' pour stocker les fichiers
        // Assurez-vous que le dossier spécifié existe sur votre serveur
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    // Définition de la manière dont les fichiers seront nommés une fois stockés
    filename: function (req, file, cb) {
        // Extraire l'extension du fichier à partir de son nom d'origine
        const fileExtension = file.originalname.split('.').pop();
        // Créer un nom de fichier temporaire utilisant un horodatage pour éviter les conflits de noms
        const tempName = Date.now() + '.' + fileExtension;
        cb(null, tempName);
    }
});

// Créer l'objet upload utilisant la configuration de stockage définie
const upload = multer({ storage: storage });

// Exportation de l'objet upload pour l'utiliser dans d'autres parties de l'application
module.exports = upload;
