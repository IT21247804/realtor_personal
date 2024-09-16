const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const getPropertyRequests = "SELECT * FROM property_request";

    db.query(getPropertyRequests, (err, results) => {
      console.log("property requests: ", results);
      if (err) {
        console.error("Error retrieving data:", err.message);
        return res.status(500).json({ error: "Failed to retrieve data" });
      }

      res.status(200).json(results);
    });
  });

  return router;
};
