const express = require("express");
const router = express.Router();
const {
  login,
  register,
  authenticate,
} = require("../controllers/user.controller");

//TESTING ROUTER
// router.get("/", (req, res) => {
//   return res.status(200).json({
//     status: true,
//     message: "Todo en orden.",
//   });
// });

router
  .get("/authenticate", authenticate)//Puedo cambiar a "/auth" para abreviar la ruta en el endpoint
  .post("/login", login)
  .post("/register", register);

module.exports = router;
