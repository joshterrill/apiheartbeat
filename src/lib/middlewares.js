const jwt = require('jsonwebtoken');

// todo: refactor this
const checkToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.split('Bearer ')[1];
  } else {
    return res.json({
      ok: false,
      message: 'Auth token is not supplied'
    });
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Token is not valid',
        });
      } else {
        req.token = decoded;
        next();
      }
    });
  } else {
    return res.json({
      ok: false,
      message: 'Auth token is not supplied',
    });
  }
};

module.exports = {
  checkToken,
}