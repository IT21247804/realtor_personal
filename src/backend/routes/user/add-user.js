const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Add this for password hashing
//check new repo - pasan baddewithana
module.exports = (db) => {
  router.post("/", async (req, res) => {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Define SQL query with password field
      const addUser = `
        INSERT INTO user (email, firstname, lastname, userRole, password)
        VALUES (?, ?, ?, ?, ?)`;

      // Extract values from request body
      const userValues = [
        req.body.email,
        req.body.firstname,
        req.body.lastname,
        req.body.userRole,
        hashedPassword, // Add hashed password
      ];

      console.log("add user: ", {
        ...req.body,
        password: "********" // Hide password in logs
      });

      // Execute the query
      db.query(addUser, userValues, (err, results) => {
        if (err) {
          console.error("Error inserting user data: ", err.message);
          return res.status(500).json({ error: "Failed to insert user data" });
        }

        console.log("User added successfully");
        res.status(201).json({ message: "User added successfully" });
      });
    } catch (error) {
      console.error("Error creating user: ", error.message);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  return router;
};