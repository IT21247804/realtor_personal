const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const getProperty = "SELECT * FROM property";

    db.query(getProperty, (err, results) => {
      console.log("get properties: ", getProperty);
      if (err) {
        console.error("Error retrieving data:", err.message);
        return res.status(500).json({ error: "Failed to retrieve data" });
      }

      res.status(200).json(results);
    });
  });

  return router;
};
