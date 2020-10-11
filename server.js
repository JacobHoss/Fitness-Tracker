const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const app = express();

const db = require("./models");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// HTML Routes - - - - - - - - - - - - - -
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

// API Routes - - - - - - - - - - - - - -

// Get Route
app.get("api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
});

// Update Route
app.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const exercise = req.body;
  db.Workout.findByIdAndUpdate(id, {
    $push: { exercises: exercise }
  })
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
});

// Create Route
app.post("/api/workouts", (req, res) => {
  const workout = req.body;
  db.Workout.create(workout)
    .then((data) => res.json(data));
});

app.listen(PORT, () => {
  console.log(`Visit the following URL to see the app locally http://localhost:${PORT}`);
});