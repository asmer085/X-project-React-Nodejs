//generisao chatgpt

const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../../config");
const { User } = require("../../../db/models");
const bearerToken = require("express-bearer-token");
const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
    roles: user.roles,
  };

  // const token = jwt.sign({ data: userDataForToken }, secret);
  // const token = jwt.sign({ data: userDataForToken }, process.env.JWT_SECRET);
  const token = jwt.sign({ data: userDataForToken }, 'e2942ea722fb58e0518b45ab83eb4887b5da8d1f0e038c110d056727bbb42b25', {
    expiresIn: parseInt('1h', 10),
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  //Changed jwt token here as well
  return jwt.verify(
    token,
    secret,
    null,
    async (err, jwtPayload) => {
      if (err) {
        err.status = 401;
        return next(err);
      }

      const { id } = jwtPayload.data;
      try {
        req.user = await User.findByPk(id);
      } catch (e) {
        return next(e);
      }
      if (!req.user) {
        return res.set("WWW-Authenicate", "Bearer").status(401).end();
      }
      return next();
    }
  );
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = { getUserToken, requireAuth };
