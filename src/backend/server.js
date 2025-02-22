require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path"); 

const app = express();
app.use(cors());
app.use(express.json());

// Setup the database connection with error handling
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

try {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      throw new Error("Database connection failed.");
    }
    console.log("Connected to database as id " + db.threadId);
  });
} catch (error) {
  console.error("Database connection error: ", error);
  process.exit(1); // Exit if the database connection fails
}

//  property routes
try {
  const addProperty = require("./routes/property/add-property");
  const getProperty = require("./routes/property/get-all-properties");
  const getPropertyById = require("./routes/property/get-property-by-id");
  const deletePropertyById = require("./routes/property/delete-property-by-id");
  const setSignatureProperty = require("./routes/property/set-signature-property");
  const getSignatureProperty = require("./routes/property/get-signature-property");
  const setPropertyStatus = require("./routes/property/set-property-status");

  app.use("/add-property", addProperty(db));
  app.use("/get-all-properties", getProperty(db));
  app.use("/get-property-by-id", getPropertyById(db));
  app.use("/delete-property-by-id", deletePropertyById(db));
  app.use("/set-signature-property", setSignatureProperty(db));
  app.use("/get-signature-property", getSignatureProperty(db));
  app.use("/set-property-status", setPropertyStatus(db));
} catch (error) {
  console.error("Error setting up property routes: ", error);
}

// market routes
try {
  const addMarket = require("./routes/market/add-market");
  const getAllMarket = require("./routes/market/get-all-market");
  const deleteMarketById = require("./routes/market/delete-market-by-id");

  app.use("/add-market", addMarket(db));
  app.use("/get-all-market", getAllMarket(db));
  app.use("/delete-market-by-id", deleteMarketById(db));
} catch (error) {
  console.error("Error setting up market routes: ", error);
}

// property-request routes
try {
  const addPropertyRequest = require("./routes/property-request/add-property-request");
  const getAllPropertyRequest = require("./routes/property-request/get-all-property-request");

  app.use("/add-property-request", addPropertyRequest(db));
  app.use("/get-all-property-request", getAllPropertyRequest(db));
} catch (error) {
  console.error("Error setting up property request routes: ", error);
}

// user routes
try {
  const addUser = require("./routes/user/add-user");
  const getAllUsers = require("./routes/user/get-all-users");

  app.use("/add-user", addUser(db));
  app.use("/get-all-users", getAllUsers(db));
} catch (error) {
  console.error("Error setting up user routes: ", error);
}

// property description routes
try {
  const getPropertyDescriptionByProprtyId = require("./routes/property-description/get-property-description-by-property-id");
  const getAllProperties = require("./routes/property-description/get-property-descriptions");
  const deletePropertyDescriptionByPropertyId = require("./routes/property-description/delete-property-description-by-property-id");

  app.use(
    "/get-property-description-by-property-id",
    getPropertyDescriptionByProprtyId(db)
  );
  app.use("/get-property-descriptions", getAllProperties(db));
  app.use(
    "/delete-property-description-by-property-id",
    deletePropertyDescriptionByPropertyId(db)
  );
} catch (error) {
  console.error("Error setting up property description routes: ", error);
}

// File upload route (for team details)
try {
  const addTeam = require("./routes/add-team"); // Update with actual path to the route
  app.use("/add-team", addTeam(db)); // Pass db to the route
} catch (error) {
  console.error("Error setting up file upload routes: ", error);
}

try {
  const getTeam = require("./routes/get-team"); // Update with actual path to the route
  app.use("/get-team", getTeam(db)); // Pass db to the route
} catch (error) {
  console.error("Error getting team details ", error);
}

try {
  const deleteTeam = require("./routes/delete-team"); // Update with actual path to the route
  app.use("/delete-team", deleteTeam(db)); // Pass db to the route
} catch (error) {
  console.error("Error deleteing team details ", error);
}

try {
  const updateTeam = require("./routes/update-team"); // Update with actual path to the route
  app.use("/update-team", updateTeam(db)); // Pass db to the route
} catch (error) {
  console.error("Error update team details ", error);
}

try {
  const getTeamById = require("./routes/get-team-id"); // Path to your get-team-by-id route
  app.use("/get-team", getTeamById(db)); // Use "/get-team" for the base path
} catch (error) {
  console.error("Error getting team member by ID: ", error);
}


//testimonials

// Routes
try {
  const addTestimonials = require("./routes/add-testimonials");
  app.use("/add-testimonials", addTestimonials(db));
} catch (error) {
  console.error("Error setting up add testimonials route: ", error);
}

try {
  const getTestimonials = require("./routes/get-testimonials");
  app.use("/get-testimonials", getTestimonials(db));
} catch (error) {
  console.error("Error getting testimonials: ", error);
}

try {
  const deleteTestimonials = require("./routes/delete-testimonials");
  app.use("/delete-testimonials", deleteTestimonials(db));
} catch (error) {
  console.error("Error deleting testimonial: ", error);
}

try {
  const updateTestimonials = require("./routes/update-testimonials");
  app.use("/update-testimonials", updateTestimonials(db));
} catch (error) {
  console.error("Error updating testimonial: ", error);
}

try {
  const getTestimonialsById = require("./routes/get-testimonials-id");
  app.use("/get-testimonials", getTestimonialsById(db));
} catch (error) {
  console.error("Error getting testimonial by ID: ", error);
}

// blog routes
try {
  const addBlog = require("./routes/add-blog");
  app.use("/add-blog", addBlog(db));
} catch (error) {
  console.error("Error setting up add blog route: ", error);
}

try {
  const getBlogs = require("./routes/get-blog");
  app.use("/get-blogs", getBlogs(db));
} catch (error) {
  console.error("Error getting blogs: ", error);
}

try {
  const deleteBlog = require("./routes/delete-blog");
  app.use("/delete-blog", deleteBlog(db));
} catch (error) {
  console.error("Error deleting blog: ", error);
}

try {
  const updateBlog = require("./routes/update-blog");
  app.use("/update-blog", updateBlog(db));
} catch (error) {
  console.error("Error updating blog: ", error);
}

try {
  const getBlogById = require("./routes/get-blog-id");
  app.use("/get-blog-id", getBlogById(db));
} catch (error) {
  console.error("Error getting blog by ID: ", error);
}


 app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// Start the server
try {
  const port = process.env.MYSQL_PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error starting the server: ", error);
}
