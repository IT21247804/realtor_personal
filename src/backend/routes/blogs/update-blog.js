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

  // PUT route to update blog details
  router.put("/:id", upload.single("image"), (req, res) => {
    const { id } = req.params;
    const { date, title, description, author } = req.body; // Extract details from request body
    const image = req.file ? req.file.path : null; // Get the file path if file exists

    if (!date || !title || !description || !author) {
      return res.status(400).json({ error: "Date, title, description, and author are required." });
    }

    // Prepare the query to update the blog
    const query = `UPDATE blogs SET date = ?, title = ?, description = ?, author = ?${image ? ', image = ?' : ''} WHERE id = ?`;
    const values = [date, title, description, author, ...(image ? [image] : []), id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating blog in MySQL: ", err.stack);
        return res.status(500).json({ error: "Failed to update blog" });
      }
      res.status(200).json({ message: "Blog updated successfully" });
    });
  });

  return router;
};