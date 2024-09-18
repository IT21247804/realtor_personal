const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // DELETE route to delete property descriptions by property_id
  router.delete("/:propertyId", (req, res) => {
    const propertyId = req.params.propertyId; // Extract propertyId from the route parameter

    console.log("delete property, id: ", req.params);

    const deletePropertyDescriptionsQuery = `
      DELETE FROM property_description WHERE property_id = ?
    `;

    db.query(deletePropertyDescriptionsQuery, [propertyId], (err) => {
      console.log(
        "delete property description",
        deletePropertyDescriptionsQuery
      );
      if (err) {
        console.error("Error deleting property descriptions:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to delete property descriptions" });
      }

      res
        .status(200)
        .json({ message: "Property descriptions deleted successfully" });
    });
  });

  return router;
};
