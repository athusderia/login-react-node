const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse")

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  //autenticar usuario
  const accesToken = "acces_token";
  const refreshToken = "refresh_token";
  const user = {
    id:1,
    name: 'Erick',
    username: 'Athus'
  }

  // Respuesta única
  res.status(200).json(jsonResponse(200, {user, accesToken, refreshToken }));
});
module.exports =router;