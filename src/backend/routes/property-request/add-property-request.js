const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // Define SQL query with correct syntax
    const addPropertyRequest = `
      INSERT INTO property_request (contact, email, firstname, lastname, location, propertyType, listingType)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Extract values from request body
    const propertyRequestValues = [
      req.body.contact,
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      req.body.location,
      req.body.propertyType,
      req.body.listingType,
    ];

    // Execute the query
    db.query(addPropertyRequest, propertyRequestValues, (err, results) => {
      if (err) {
        console.error("Error inserting market data: ", err.message);
        return res
          .status(500)
          .json({ error: "Failed to insert property request data" });
      }

      console.log("Market data added successfully");
      res
        .status(201)
        .json({ message: "Property request data added successfully" });
    });
  });

  return router;
};
