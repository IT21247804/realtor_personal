const express = require("express");
const fs = require("fs");

const router = express.Router();

module.exports = (db) => {
  // DELETE route to remove a testimonial
  router.delete("/:id", (req, res) => {
    const { id } = req.params;

    // Query to get the image path for deleting the image file
    const getImageQuery = "SELECT image FROM testimonials WHERE id = ?";
    
    db.query(getImageQuery, [id], (err, result) => {
      if (err) {
        console.error("Error fetching testimonial for deletion: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch testimonial for deletion" });
      }

      // If a testimonial is found
      if (result.length > 0) {
        const imagePath = result[0].image;

        // Delete the testimonial record from database
        const deleteQuery = "DELETE FROM testimonials WHERE id = ?";
        db.query(deleteQuery, [id], (err, result) => {
          if (err) {
            console.error("Error deleting testimonial: ", err.stack);
            return res.status(500).json({ error: "Failed to delete testimonial" });
          }

          // Optionally delete the image file from the server (if the file exists)
          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Delete the image file
          }

          res.status(200).json({ message: "Testimonial deleted successfully" });
        });
      } else {
        res.status(404).json({ error: "Testimonial not found" });
      }
    });
  });

  return router;
};