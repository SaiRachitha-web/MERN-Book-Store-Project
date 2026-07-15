const jwt = require("jsonwebtoken");

// POST /api/auth/login — admin login with email and password
function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ role: "admin", email }, jwtSecret, {
    expiresIn: "24h",
  });

  res.json({ token, message: "Login successful" });
}

module.exports = { login };
