const { verifyToken } = require("../helper/jwt");
const { tbl_user } = require("../models");

async function isAuthenticated(req, res, next) {
    console.log(req.headers,"req.headers");
  try {
    let accessToken = req.headers.authorization;
    console.log(accessToken,">>>accessToken");
    if (!accessToken) {
      throw { name: "invalid-token" };
    }
    let [bearer, token] = accessToken.split(" ");

    if (bearer !== "Bearer") {
      throw { name: "invalid-token" };
    }

    let payload = verifyToken(token);

    let user = await tbl_user.findByPk(payload.id);

    console.log(user,">>>>user");

    if (!user) {
      throw { name: "invalid-token" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated;
