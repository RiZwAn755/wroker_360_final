
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
    name:{type:String},
    occupation:{type:String},
    experience:{type:String},
    wageperhr:{type:String},
    location:{type:String}
});

module.exports = mongoose.model("worker" , workerSchema);