const express = require("express");
const fs = require("fs");

const router = express.Router();

module.exports = (db) => {
  // DELETE route to remove a team member
  router.delete("/:id", (req, res) => {
    const { id } = req.params;

    // Query to get the image path for deleting the image file
    const getImageQuery = "SELECT image FROM team WHERE id = ?";
    
    db.query(getImageQuery, [id], (err, result) => {
      if (err) {
        console.error("Error fetching team member for deletion: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch team member for deletion" });
      }

      // If a team member is found
      if (result.length > 0) {
        const imagePath = result[0].image;

        // Delete the team member record from database
        const deleteQuery = "DELETE FROM team WHERE id = ?";
        db.query(deleteQuery, [id], (err, result) => {
          if (err) {
            console.error("Error deleting team member: ", err.stack);
            return res.status(500).json({ error: "Failed to delete team member" });
          }

          // Optionally delete the image file from the server (if the file exists)
          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Delete the image file
          }

          res.status(200).json({ message: "Team member deleted successfully" });
        });
      } else {
        res.status(404).json({ error: "Team member not found" });
      }
    });
  });

  return router;
};
