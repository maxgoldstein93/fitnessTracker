const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: Date,
    exercises: Array,
    type: String,
    name: String,
    duration: Number,
    disatance: Number,
    weight: Number,
    reps: Number,
    sets: Number,

   
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;