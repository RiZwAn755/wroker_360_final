
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
   
    picture:{type:String},
    name:{type:String},
    occupation:{type:String},
    experience:{type:Number},
    wageperhr:{type:Number},
    location:{type:String},
});

module.exports = mongoose.model("worker" , workerSchema);