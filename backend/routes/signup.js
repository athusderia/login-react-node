const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  const user = new User({username, name, password});

  user.save();

  // Respuesta única
  res.status(200).json(jsonResponse(200, { message: "User created successfully" }));
});
module.exports =router;