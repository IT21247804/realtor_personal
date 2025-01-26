const express = require("express");

const router = express.Router();

module.exports = (db) => {
  // GET route to fetch a specific testimonial by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params; // Extract the ID from the URL parameters

    // Query to fetch testimonial by ID
    const query = "SELECT * FROM testimonials WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error fetching testimonial: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch testimonial" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      // If the testimonial is found, return its data
      res.status(200).json(result[0]); 
    });
  });

  return router;
};