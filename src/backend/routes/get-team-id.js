const express = require("express");

const router = express.Router();

module.exports = (db) => {
  // GET route to fetch a specific team member by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params; // Extract the ID from the URL parameters

    // Query to fetch team member by ID
    const query = "SELECT * FROM team WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error fetching team member: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch team member" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Team member not found" });
      }

      // If the team member is found, return their data
      res.status(200).json(result[0]); 
    });
  });

  return router;
};
