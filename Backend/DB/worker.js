
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
    name:{type:String},
    experience:{type:String},
    occupation:{type:String},
    wageperhour:{type:String},
    location:{type:String}
});

module.exports = mongoose.model("worker" , workerSchema);