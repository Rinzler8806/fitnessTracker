const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbNewWorkout => {
      res.json(dbNewWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({
  body,
  params
}, res) => {
  Workout.findByIdAndUpdate(params.id, {
      $push: {
        exercises: body
      }
    }, {
      new: true
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workout", (req, res) => {
  Workout.find({})
    .sort({
      date: -1
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbLastWorkout => {
      res.json(dbLastWorkout);
    })
    .catch(err => {
      res.json(err)
    });
});

module.exports = router;