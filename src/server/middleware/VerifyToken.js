const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ message: 'Access Denied' });

  try {
    // Verify header token
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // Assign the user with the verified token object
    req.user = verified;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Access Denied' });
  }
};

module.exports = auth;
