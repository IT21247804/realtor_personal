const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Route to update the property status by ID
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Expecting { status: 'available', 'sold', etc. }

    // Define allowed status values (optional, if you want to validate status)
    const allowedStatuses = ["available", "sold", "under_offer", "rented"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updateStatusQuery = "UPDATE property SET status = ? WHERE id = ?";

    db.query(updateStatusQuery, [status, id], (err, result) => {
      if (err) {
        console.error("Error updating status:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to update property status" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Property not found" });
      }

      res.status(200).json({ message: "Status updated successfully" });
    });
  });

  return router;
};
