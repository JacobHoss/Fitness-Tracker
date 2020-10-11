const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true,
                enum: ["resistance", "cardio"]
            },
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            distance: {
                type: Number,
                required: () => {
                    return this.type === "cardio"
                }
            },
            weight: {
                type: Number,
                required: () => {
                    return this.type === "resistance"
                }
            },
            reps: {
                type: Number,
                required: () => {
                    return this.type === "resistance"
                }
            },
            sets: {
                type: Number,
                required: () => {
                    return this.type === "resistance"
                }
            }
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;