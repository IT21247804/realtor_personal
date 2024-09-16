const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const getPropertiesWithSignature =
      "SELECT * FROM property WHERE signature = true";

    db.query(getPropertiesWithSignature, (err, results) => {
      console.log("get property with signature: ", getPropertiesWithSignature);
      if (err) {
        console.error("Error retrieving data:", err.message);
        return res.status(500).json({ error: "Failed to retrieve data" });
      }

      res.status(200).json(results);
    });
  });

  return router;
};
