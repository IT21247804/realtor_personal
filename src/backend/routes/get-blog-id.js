const express = require("express");

const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM blogs WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error fetching blog: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch blog" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.status(200).json(result[0]);
    });
  });

  return router;
};