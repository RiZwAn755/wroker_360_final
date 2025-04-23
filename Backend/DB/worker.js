
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
   
    picture:{type:String},
    name:{type:String , require: true},
    occupation:{type:String , require:true},
    experience:{type:Number},
    wageperhr:{type:Number},
    location:{type:String , require: true},
    mobile:{type:String , require:true},
});

module.exports = mongoose.model("worker" , workerSchema);