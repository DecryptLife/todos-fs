const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function isVerified(req, res, next) {
  console.log(req.cookies);
  // const token =
  //   req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  const token = req.cookies && req.cookies.token;
  console.log("Token: ", token);
  console.log("Env: ", process.env.JWT_SECRET);

  if (!token) return res.status(401).json({ error: "access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err.message);
      res.status(401).send("authentication error");
      return;
    }

    req.user = user;
    next();
  });
}

module.exports = isVerified;
