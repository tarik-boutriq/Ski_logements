const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Accès refusé. Authentification requise." });
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.auth = {
      userId: decodedToken.userId
    };

    next();
    
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};