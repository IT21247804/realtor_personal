const express = require("express");

const router = express.Router();

module.exports = (db) => {
  // GET route to fetch all blogs
  router.get("/", (req, res) => {
    const query = "SELECT * FROM blogs";
    
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching blogs: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch blogs" });
      }
      res.status(200).json(result); // Return blogs with image paths
    });
  });

  return router;
};