const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const users = [];
let id = 1;

// register
router.post("/register", (req, res) => {
  console.log("In user register");
  try {
    const { username, password } = req.body;
    const newUser = {
      id,
      username,
      password,
    };
    id += 1;
    users.push(newUser);
    console.log("Registration completed");
    res.json({ message: `${newUser.user} registered successfully` });
  } catch (e) {
    console.log("Registration failed");
    res.status(500).json({ error: "Registration failed" });
  }
});

// login => generate access token
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(`username: ${username} , password: ${password} `);
  console.log("Login : ", process.env.JWT_SECRET);
  const user = users.find((user) => {
    return user.username === username;
  });

  console.log("User: ", user);

  if (!user) {
    console.log("user not found");
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax", // Adjust based on your use case
    secure: false,
    maxAge: 3600000, // 1 hour
  });

  console.log("login successfull");
  res.status(200).json({ message: "Login successful" });
});

module.exports = router;
