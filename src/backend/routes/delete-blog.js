const express = require("express");
const fs = require("fs");

const router = express.Router();

module.exports = (db) => {
  // DELETE route to remove a blog
  router.delete("/:id", (req, res) => {
    const { id } = req.params;

    // Query to get the image path for deleting the image file
    const getImageQuery = "SELECT image FROM blogs WHERE id = ?";
    
    db.query(getImageQuery, [id], (err, result) => {
      if (err) {
        console.error("Error fetching blog for deletion: ", err.stack);
        return res.status(500).json({ error: "Failed to fetch blog for deletion" });
      }

      // If a blog is found
      if (result.length > 0) {
        const imagePath = result[0].image;

        // Delete the blog record from database
        const deleteQuery = "DELETE FROM blogs WHERE id = ?";
        db.query(deleteQuery, [id], (err, result) => {
          if (err) {
            console.error("Error deleting blog: ", err.stack);
            return res.status(500).json({ error: "Failed to delete blog" });
          }

          // Optionally delete the image file from the server (if the file exists)
          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Delete the image file
          }

          res.status(200).json({ message: "Blog deleted successfully" });
        });
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    });
  });

  return router;
};