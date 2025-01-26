const express = require("express");

const router = express.Router();

module.exports = (db) => {
  // GET route to fetch all testimonials
  router.get("/", (req, res) => {
    const query = "SELECT * FROM testimonials";
    
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching testimonials: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch testimonials" });
      }
      res.status(200).json(result); // Return testimonials with image paths
    });
  });

  return router;
};