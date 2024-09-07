const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // Define SQL query with correct syntax
    const addUser = `
      INSERT INTO user (email, firstname, lastname, userRole)
      VALUES (?, ?, ?, ?)`;

    // Extract values from request body
    const userValues = [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      req.body.userRole,
    ];

    // Execute the query
    db.query(addUser, userValues, (err, results) => {
      if (err) {
        console.error("Error inserting market data: ", err.message);
        return res.status(500).json({ error: "Failed to insert market data" });
      }

      console.log("Market data added successfully");
      res.status(201).json({ message: "Market data added successfully" });
    });
  });

  return router;
};
