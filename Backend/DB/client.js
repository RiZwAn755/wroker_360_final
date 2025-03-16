const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: { type: String},
    email: { type:String},
    password: { type: String },
    location:{type:String}
});

module.exports = mongoose.model("client", clientSchema); 
