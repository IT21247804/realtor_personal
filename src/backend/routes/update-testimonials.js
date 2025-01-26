const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

module.exports = (db) => {
  // Configure Multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });

  // PUT route to update testimonial details
  router.put("/:id", upload.single("image"), (req, res) => {
    const { id } = req.params;
    const { review, fullname, designation, company } = req.body;
    const image = req.file ? req.file.path : null; // Check if image was uploaded

    let query = "UPDATE testimonials SET review = ?, fullname = ?, designation = ?, company = ?";
    let values = [review, fullname, designation, company];

    if (image) {
      query += ", image = ?";
      values.push(image);
    }
    
    query += " WHERE id = ?";
    values.push(id);

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating testimonial: ", err.stack);
        return res.status(500).json({ error: "Failed to update testimonial" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      res.status(200).json({ message: "Testimonial updated successfully" });
    });
  });

  return router;
};