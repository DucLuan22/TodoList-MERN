const express = require("express");
const TodoRoutes = require("./routes/TodoRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
//Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/todos", TodoRoutes);

//Run Mongol Server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and connect to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
