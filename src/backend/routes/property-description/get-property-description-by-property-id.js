const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET route to retrieve property descriptions by property_id
  router.get("/:propertyId", (req, res) => {
    const propertyId = req.params.propertyId; // Extract propertyId from the route parameter
    //console.log("property id: ", req.params.propertyId);

    const getPropertyDescriptions = `
      SELECT * FROM property_description WHERE property_id = ?
    `;

    db.query(getPropertyDescriptions, [propertyId], (err, results) => {
      //console.log("get property descriptions: ", getPropertyDescriptions);
      if (err) {
        console.error("Error retrieving data:", err.message);
        return res.status(500).json({ error: "Failed to retrieve data" });
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: "No descriptions found for the specified property ID",
        });
      }

      res.status(200).json(results);
    });
  });

  return router;
};
