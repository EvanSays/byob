const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const tokenPiece = req.headers.authorization;

  if (!tokenPiece) {
    return res.status(403).json({
      message: 'You must have be authorized to do this action. Contact your computer guy',
    });
  }

  jwt.verify(tokenPiece, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        message: 'Gandalf says you shall not pass', error
      });
    }
    if (decoded.admin) {
      next();
    } else {
      res.status(403).json({ error: `Your admin stats is set to ${decoded.admin}. It muse be set to true to proceed` });
    }
    return null;
  });
  return null;
};

module.exports = {
  checkAuth
};
