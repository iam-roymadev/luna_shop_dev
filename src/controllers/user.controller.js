const userMethods = {};
require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function getUser(param) {
  try {
    return User.findOne(param);
  } catch (error) {
    return false;
  }
}

/** Módulo de Login **/
userMethods.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser({ email });
  if (user) {
    const verifyPassword = await user.verifyPassword(password);
    if (!verifyPassword) {
      return res.status(400).json({
        status: false,
        message: "Usuario o contraseña incorrecto",
      });
    }

    try {
      const token = jwt.sign(user._id.toString(), process.env.PRIVATE_KEY);

      return res.status(200).json({
        status: true,
        token,
        message: "Login correcto.",
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message:
          "Hubo un problema de autenticación. Por favor intenta de nuevo.",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "Usuario o contraseña incorrecto",
    });
  }
};

/**Inicia módulo de registro */
userMethods.register = async (req, res) => {
  const { username, email, password, name } = req.body;
  if (username && email && password) {
    const verifyUsername = await getUser({ username });
    if (verifyUsername) {
      return res.status(400).json({
        status: false,
        message: "Este nombre de usuario ya existe.",
      });
    }
    const verifyEmail = await getUser({ email });
    if (verifyEmail) {
      return res.status(400).json({
        status: false,
        message: "Este email ya está registrado.",
      });
    }

    const user = new User({
      username,
      email,
      password,
      name,
    });
    console.log(user);
    user.password = await user.encryptPassword(user.password);
    console.log(user);

    if (await user.save()) {
      return res.status(200).json({
        status: false,
        message: "Usuario registrado exitosamente.",
      });
    } else {
      return res.status(400).json({
        status: false,
        message:
          "Hubo un problema de autenticación. Por favor intenta de nuevo.",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "Llena todos los campos requeridos.",
    });
  }
};

/**Inicia módulo de autenticación */
userMethods.authenticate = (req, res) => {
  try {
    const token = req.headers["authorization"];
    //console.log(token);
    if (token) {
        const verify =jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(verify)
    if (verify) {
        return res.status(200).json({
            status: true,
            message: "El token es correcto.",
          });
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

module.exports = userMethods;
