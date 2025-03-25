const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;
    
    const query = "SELECT * FROM user WHERE email = ? AND password = ?";

    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error("Error during login:", err.message);
        return res.status(500).json({ error: "Login failed" });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid email or password" 
        });
      }

      const user = results[0];
      
      // Don't send password in response
      delete user.password;

      res.status(200).json({
        success: true,
        user: user
      });
    });
  });

  return router;
};