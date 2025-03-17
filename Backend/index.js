const express = require("express");
const app = express();
const cors = require("cors");
require("./DB/config");
const client = require("./DB/client");
const worker = require("./DB/worker");

app.use(cors());
app.use(express.json());

// signup API for client
app.post("/clreg", async (req, resp) => {
 
    console.log("Received registration request:", req.body);
    let result = new client(req.body);
    await result.save();
    result = result.toObject();
    resp.send(result);
 
});

app.post("/login", async (req, resp) => {
  
    let user = await client.findOne({ email: req.body.email, password:req.body.password }).select("-password");

    if (!user) {
      return resp.status(404).send({ error: "User not found" });
    }
   else{
           
             resp.send(user);
       }
});

app.get("/workList", async (req , resp) =>{
     
  let wrker = await worker.find();
  if(wrker)
  {
        resp.send(wrker);
  }
  else{
    resp.send("No wroker Found")
  }
})


// signup API for worker
app.post("/wkreg", async (req, resp) => {
  
    console.log("Received registration request:", req.body);
    let result = new worker(req.body);
    await result.save();
    result = result.toObject();
    console.log("Registration successful:", result);
    resp.send(result);
  
});

// search API for finding worker based on wage per hr
app.get("/search/:key", async (req, resp) => {
  
    let result = await worker.find({
      "$or": [
        { wageperhour: { $regex: req.params.key, $options: "i" } },
        { location: { $regex: req.params.key, $options: "i" } }
      ]
    });

    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.status(404).send({ message: "No workers found" });
    }
 
});

app.listen(3500);
  
