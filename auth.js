const JWT = require('jsonwebtoken');

/* this authentication uses authorization header and bearer token */
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization');
  let token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'no auth token' });
  else {
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, accountId) => {
      if (err) return res.status(403).json({ msg: 'invalid token' });
      else {
        req.accountId = accountId;
        next();
      }
    });
  }
}

/* this authentication uses cookies */
exports.authenticateCookieToken = (req, res, next) => {
  let { accessToken } = req.cookies;

  if (!accessToken) return res.status(401).json({ msg: 'no auth token' });

  JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, accountId) => {
    if (err) return res.status(403).json({ msg: 'invalid token' });
    else {
      req.accountId = accountId;
      next();
    }
  });
}
