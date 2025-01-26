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

  // POST route to upload testimonial details
  router.post("/", upload.single("image"), (req, res) => {
    const { review, fullname, designation, company } = req.body; // Extract details from request body
    const image = req.file ? req.file.path : null; // Get the file path if file exists

    if (!review || !fullname || !designation || !company || !image) {
      return res.status(400).json({ error: "Review, fullname, designation, company, and image are required." });
    }

    // Insert testimonial data into the 'testimonials' table in MySQL
    const query = `INSERT INTO testimonials (image, review, fullname, designation, company) VALUES (?, ?, ?, ?, ?)`;

    const values = [image, review, fullname, designation, company];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: ", err.stack);
        return res.status(500).json({ error: "Failed to insert testimonial" });
      }
      res.status(201).json({ message: "Testimonial added successfully" });
    });
  });

  return router;
};