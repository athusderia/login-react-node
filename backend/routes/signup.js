const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  try {
    const user = new User();
    const exists = await user.usernameExist(username);

    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "Username alredy exists",
        })
      );
    }

    const newUser = new User({ username, name, password });

    newUser.save();

    // Respuesta única
    res
      .status(200)
      .json(jsonResponse(200, { message: "User created successfully" }));
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    );
  }
});

module.exports = router;
