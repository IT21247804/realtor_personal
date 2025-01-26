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
      // Console log the perval value
      console.log("Perval value:", result[0].perval);

      res.status(200).json(result[0]); // Return the property details
    });
  });

  return router;
};
