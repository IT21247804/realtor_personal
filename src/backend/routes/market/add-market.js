const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // Define SQL query with correct syntax
    const addMarket = `
      INSERT INTO market (location, description, cover)
      VALUES (?, ?, ?)`;

    // Extract values from request body
    const marketValues = [
      req.body.location,
      req.body.description,
      req.body.cover,
    ];

    // Execute the query
    db.query(addMarket, marketValues, (err, results) => {
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
