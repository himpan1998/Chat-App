const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  // generate JWT token:
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  console.log("Generated token:", token);
  return token;
};

module.exports = generateToken;
