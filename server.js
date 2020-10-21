const express = require("express")
const mongoose = require("mongoose");
const path = require("path")
const logger = require("morgan");
const Workout = require("./models/workout");

const app = express();

app.use(logger("dev"));

const PORT = process.env.PORT || 3636





mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// API Routes
// POST /api/Workouts
app.post("/api/workouts", function (req, res) {
    const newWorkout = new Workout(req.body);
    Workout.create(newWorkout)
    .then(dbWorkout => {
        
        res.json(dbWorkout);
      })
      .catch(err => {
        
        res.json(err);
      });

});

// PUT /api/workouts/:id

// GET /api/workouts/range




// HTML ROUTES
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}! `)
})

