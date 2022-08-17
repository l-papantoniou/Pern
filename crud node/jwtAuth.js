const express = require("express");
const router = express.Router();
const pool = require("./db");
const jwtGenerator = require("./jwtGenerator");
const validInfo = require("./validinfo");
const authorization = require("./authorization");

//login route

router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the body

    const { email, password } = req.body;

    //2. check if user doesn't exist (if not then we throw an error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    //3. check if incoming password is the same database password
    //const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (password !== user.rows[0].password) {
      return res.status(401).json("Λάθος email ή κωδικός!");
    }

    //4. give them the jwt token

    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify", authorization, async (req, res) => {
  try {
    res.status(200).send('Empty Body');
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
