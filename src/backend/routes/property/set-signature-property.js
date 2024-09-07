const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Route to set the property signature by ID
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { signature } = req.body; // Expecting { signature: true/false }

    if (typeof signature !== "boolean") {
      return res.status(400).json({ error: "Invalid signature value" });
    }

    const updateSignatureQuery =
      "UPDATE property SET signature = ? WHERE id = ?";

    db.query(updateSignatureQuery, [signature, id], (err, result) => {
      if (err) {
        console.error("Error updating signature:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to update property signature" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Property not found" });
      }

      res.status(200).json({ message: "Signature updated successfully" });
    });
  });

  return router;
};
