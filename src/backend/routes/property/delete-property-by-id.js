const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // DELETE route to delete a market by ID
  router.delete("/:id", (req, res) => {
    const marketId = req.params.id;

    // Define SQL query to delete the market by ID
    const deleteMarket = `
      DELETE FROM property
      WHERE id = ?`;

    // Execute the query
    db.query(deleteMarket, [marketId], (err, results) => {
      console.log("delete market: ", deleteMarket);
      if (err) {
        console.error("Error deleting market data: ", err.message);
        return res.status(500).json({ error: "Failed to delete market data" });
      }

      if (results.affectedRows === 0) {
        // No rows affected means the ID was not found
        return res.status(404).json({ error: "Market not found" });
      }

      console.log("Market data deleted successfully");
      res.status(200).json({ message: "Market data deleted successfully" });
    });
  });

  return router;
};
