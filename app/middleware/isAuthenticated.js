/**
 * Middleware pour vérifier si un utilisateur est authentifié.
 * Cette fonction est utilisée pour protéger les routes qui nécessitent une authentification.
 * 
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {Function} next - La fonction middleware suivante dans la pile.
 */
function isAuthenticated(req, res, next) {
    // Vérifier si l'utilisateur est authentifié (c'est-à-dire connecté)
    if (req.isAuthenticated()) {
        // Si l'utilisateur est authentifié, passez à la prochaine fonction middleware
        return next();
    }
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    // Cela empêche l'accès aux routes protégées et guide l'utilisateur vers l'authentification
    res.redirect('/utilisateurs/connexion');
}

// Exporter la fonction pour qu'elle puisse être utilisée comme middleware dans d'autres fichiers
module.exports = isAuthenticated;
