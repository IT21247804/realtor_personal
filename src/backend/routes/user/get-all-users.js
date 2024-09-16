const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const getMarket = "SELECT * FROM user";

    db.query(getMarket, (err, results) => {
      console.log("users: ", results);
      if (err) {
        console.error("Error retrieving data:", err.message);
        return res.status(500).json({ error: "Failed to retrieve data" });
      }

      res.status(200).json(results);
    });
  });

  return router;
};
