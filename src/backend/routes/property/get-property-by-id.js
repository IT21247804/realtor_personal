const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Route to get property details by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const getPropertyById = "SELECT * FROM property WHERE id = ?";

    db.query(getPropertyById, [id], (err, result) => {
      console.log("get property by id: ", getPropertyById);
      if (err) {
        console.error("Error retrieving data:", err.message);
        return res.status(500).json({ error: "Failed to retrieve data" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Property not found" });
      }

      res.status(200).json(result[0]); // Return the property details
    });
  });

  return router;
};
