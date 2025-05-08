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

  // POST route to upload blog details
  router.post("/", upload.single("image"), (req, res) => {
    const { date, title, description, author } = req.body; // Extract details from request body
    const image = req.file ? req.file.path : null; // Get the file path if file exists

    if (!date || !title || !description || !author || !image) {
      return res.status(400).json({ error: "Date, title, description, author, and image are required." });
    }

    // Insert blog data into the 'blogs' table in MySQL
    const query = `INSERT INTO blogs (image, date, title, description, author) VALUES (?, ?, ?, ?, ?)`;

    const values = [image, date, title, description, author];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL: ", err.stack);
        return res.status(500).json({ error: "Failed to insert blog" });
      }
      res.status(201).json({ message: "Blog added successfully" });
    });
  });

  return router;
};