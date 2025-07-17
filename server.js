const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
require("./routes/user.routes")(app);
require("./routes/config.routes")(app);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Smart Admin API." });
});

// Sync DB and start server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
