const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    //console.log(token);
    if (token) {
      const verify = jwt.verify(token, process.env.PRIVATE_KEY);
      console.log(verify);
      if (verify) {
        req.userID = token;
        req.user = await User.findById(verify);
        console.log(req.user)
        next();
      } else {
        return res.status(400).json({
          status: false,
          message: "Token incorrecto.",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Token requerido.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Token inválido.",
    });
  }
};

module.exports = authMiddleware;
