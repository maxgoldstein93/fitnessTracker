const express = require("express")
const mongoose = require("mongoose");
const path = require("path")
const logger = require("morgan");
const Workout = require("./models/workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3636





mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// API Routes
// Working get route!!
app.get("/api/workouts", (req, res) => {
    
    Workout.find({},(err, data) => {
        if (err) {
          console.log(err);
        } else {
            // loop through all data add total and assign to variable durtion
            
            // for(var i = 0; i < data.length; i ++){

            //       var newObj = data[i]

            // }
            // console.log(newObj+"LOOOK")
           

            // const newData = {
            //     _id: data._id,
            //     day: data.day,
            //     exercises: data.exercises,
            //     weight: data.weight,
            //     sets: data.sets,
            //     reps: data.reps,
            //     // totalDuration: duration
            // }
            // console.log(newData)
          res.json(data);
        }
      });

});


// Working
app.post("/api/workouts", function (req, res) {
    
    // const newWorkout = new Workout(req.body);
    // console.log(newWorkout)
    Workout.create({})

        .then(dbWorkout => {
            console.log("NEW WORKY")
            console.log(dbWorkout)
            res.json(dbWorkout);
            
        })
        .catch(err => {

            res.json(err);
        });

});


// // PUT /api/workouts/:id
app.put("/api/workouts/:id", (req,res)=>{
    
    const id = req.params.id
    console.log(req.body)
    console.log(id + "LOOK HERE$$$###$$$")
    Workout.findByIdAndUpdate( id,
        {$push: {exercises: req.body}},
        {new: true})
        .then(dbWorkout => {
            console.log("NEW WORKY")
            res.json(dbWorkout);
        })
        .catch(err => {

            res.json(err);
        });
        
    });



// GET /api/workouts/range
// Working
app.get("/api/workouts/range", (req, res) => {
    
    Workout.find({}, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });
    });
    









// HTML ROUTES
app.use(express.static("public"));
// require("./routes/htmlroutes")(app);


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
    console.log(`App is running on http://localhost:${PORT} `)
})

