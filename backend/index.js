const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 7100;

// routers

const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoute");
const logoRouter = require("./routes/logoRoutes");
const categoryRouter = require("./routes/categoriesRoutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const advertiseRouter = require("./routes/advertiseRoutes");
const social = require("./routes/socialRoutes");
const seo = require("./routes/seoRoutes");
const contact = require("./routes/contactRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

app.use("/user", userRoutes);
app.use("/news", newsRoutes);
app.use("/logo", logoRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/advertise", advertiseRouter);
app.use("/social", social);
app.use("/seo", seo);
app.use("/contact", contact);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
