const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
require("./routes/config.routes")(app);
const userRoutes = require("./routes/user.routes");
userRoutes(app);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Smart Admin API." });
});
app.use(cors({
  origin: "http://localhost:3000", // React port
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
// Sync DB and start server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
