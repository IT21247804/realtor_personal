const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // POST route to add a new property
  router.post("/", async (req, res) => {
    const items = Array.isArray(req.body.description)
      ? req.body.description
      : [];

    // Define SQL query to insert property data
    const addProperty = `
      INSERT INTO property (
        referenceId, firstname, lastname, contactNumberOne, contactNumberTwo, whatsappNumber, email, addressLineOne, addressLineTwo, location, age, listingType, propertyType, 
        numberOfRooms, numberOfWashrooms, floorArea, size, measuringUnit ,price, numberOfFloors, furnished, cover, pictures, video, accessRoad, airCondition, amenity, apartmentName, cod, deedType, developer, elevator, generator, parking, security, signature, status, surveyPlans 
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    console.log(10500, req.body);

    // Extract values from request body
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
      req.body.aprtmentName,
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
    ];

    const addPropertyDescription = `
          INSERT INTO property_description (description, property_id) VALUES ?
        `;

    const itemsValues = items.map((item) => [item.item || null, null]);

    db.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction: ", err.stack);
        return res.status(500).json({ error: "Failed to start transaction" });
      }

      db.query(addProperty, propertyValues, (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error inserting invoice: ", err.stack);
            return res.status(500).json({ error: "Failed to insert invoice" });
          });
        }
        const propertyId = result.insertId;

        itemsValues.forEach((item) => {
          item[1] = propertyId;
        });

        db.query(addPropertyDescription, [itemsValues], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error(
                "Error inserting property descriptions: ",
                err.stack
              );
              return res
                .status(500)
                .json({ error: "Failed to insert property descriptions" });
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error committing transaction: ", err.stack);
                return res
                  .status(500)
                  .json({ error: "Failed to commit transaction" });
              });
            }
            res
              .status(201)
              .json({ message: "Invoice and items added successfully" });
          });
        });
      });
    });
  });

  return router;
};
