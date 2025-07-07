const router = require("express").Router();

router.post("/", (req, res) => {
  const { username, name, password } = req.body;
  if (!!username || !!name || !!password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  //Crear el usuario
  res.status(200).json(jsonResponse(200, {message: "User created successfully"}))
  res.send("signout");
});

module.exports = router;
