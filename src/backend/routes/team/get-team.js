const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

module.exports = (db) => {
  // GET route to fetch all team members
  router.get("/", (req, res) => {
    const query = "SELECT * FROM team";
    
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching team members: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch team members" });
      }
      res.status(200).json(result); // Return team members with image paths
      
    });
  });

  return router;
};
