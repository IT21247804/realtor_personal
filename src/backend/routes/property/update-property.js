const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.put("/:id", async (req, res) => {
    const propertyId = req.params.id;

    const propertyValues = [
      req.body.referenceId,
      req.body.firstname,
      req.body.lastname,
      req.body.contactNumberOne,
      req.body.contactNumberTwo,
      req.body.whatsappNumber,
      req.body.email,
      req.body.addressLineOne,
      req.body.addressLineTwo,
      req.body.location,
      req.body.age,
      req.body.listingType,
      req.body.propertyType,
      req.body.numberOfRooms,
      req.body.numberOfWashrooms,
      req.body.floorArea,
      req.body.size,
      req.body.measuringUnit,
      req.body.price,
      req.body.numberOfFloors,
      req.body.furnished,
      req.body.cover,
      req.body.pictures,
      req.body.video,
      req.body.accessRoad,
      req.body.airCondition,
      req.body.amenity,
      req.body.apartmentName,
      req.body.cod,
      req.body.deedType,
      req.body.developer,
      req.body.elevator,
      req.body.generator,
      req.body.parking,
      req.body.security,
      req.body.signature,
      req.body.status,
      req.body.surveyPlans,
      req.body.perval,
      req.body.visibility,
      req.body.ownerName, // New field
      req.body.ownerContact, // New field
      propertyId
    ];

    const items = Array.isArray(req.body.description) ? req.body.description : [];
    const addPropertyDescription = `
      INSERT INTO property_description (description, property_id) VALUES ?
    `;

    try {
      await new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
          if (err) reject(err);
          resolve();
        });
      });

      // Update the property
      await new Promise((resolve, reject) => {
        const updateProperty = `
          UPDATE property SET
            referenceId = ?, firstname = ?, lastname = ?, contactNumberOne = ?, contactNumberTwo = ?, whatsappNumber = ?, email = ?, addressLineOne = ?, addressLineTwo = ?, location = ?, age = ?, listingType = ?, propertyType = ?, numberOfRooms = ?, numberOfWashrooms = ?, floorArea = ?, size = ?, measuringUnit = ?, price = ?, numberOfFloors = ?, furnished = ?, cover = ?, pictures = ?, video = ?, accessRoad = ?, airCondition = ?, amenity = ?, apartmentName = ?, cod = ?, deedType = ?, developer = ?, elevator = ?, generator = ?, parking = ?, security = ?, signature = ?, status = ?, surveyPlans = ?, perval = ?, visibility = ?, ownerName = ?, ownerContact = ? WHERE id = ?
        `;
        db.query(updateProperty, propertyValues, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      // If there are descriptions to update
      if (items.length > 0) {
        const itemsValues = items.map((item) => [item.item || null, propertyId]);

        // Delete old descriptions
        await new Promise((resolve, reject) => {
          db.query("DELETE FROM property_description WHERE property_id = ?", [propertyId], (err) => {
            if (err) reject(err);
            resolve();
          });
        });

        // Insert new descriptions
        await new Promise((resolve, reject) => {
          db.query(addPropertyDescription, [itemsValues], (err) => {
            if (err) reject(err);
            resolve();
          });
        });
      }

      await new Promise((resolve, reject) => {
        db.commit((err) => {
          if (err) reject(err);
          resolve();
        });
      });

      res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
      await new Promise((resolve, reject) => {
        db.rollback(() => {
          reject(error);
        });
      });
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Failed to update property" });
    }
  });

  return router;
};