const express = require("express");
const app = express();
const cors = require("cors");
const path  = require("path")
const multer = require("multer"); // a middleware to upload media 

require("./DB/config");
const client = require("./DB/client");
const worker = require("./DB/worker");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/uploads" , express.static("uploads")); // serve uploaded image statically

// setting up multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')  // store image in uploads folder
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + path.extname(file.originalname)); // to make a unique filename
  }
})

const upload = multer({storage })

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
    //  
  let wrker = await worker.find();
  if(wrker.length > 0)
  {
        resp.status(201).send(wrker);
  }
  else{
    resp.status(404).send("No wroker Found");
  }
})


// signup API for worker
app.post("/wkreg", upload.single("picture"), async (req, resp) => {
  try {
    const { name, occupation, experience, wageperhr, location } = req.body;

    // Store the file name if a file is uploaded
    const picture = req.file ? req.file.filename : null;

    let newWorker = new worker({
      name,
      occupation,
      experience,
      wageperhr,
      location,
      picture, // Save the picture filename in the database
    });

    await newWorker.save();
    resp.status(201).send(newWorker);
  } catch (error) {
    console.error("Error during worker registration:", error);
    resp.status(500).send({ error: "Worker registration failed" });
  }
});


// app.post("/wkrimg", upload.single("image"), async (req, resp) => {
//   const {path , filename} = req.file;  
//     let result = new imagee({path,filename});
//     await result.save(); 
//     resp.send(result);
// });
// search API for finding worker based on wage per hr


app.get("/search/:key", async (req, resp) => {
  
    let result = await worker.find({
      "$or": [
        { wageperhour: { $regex: req.params.key, $options: "i" } },
        { location: { $regex: req.params.key, $options: "i" } },
        { name: { $regex: req.params.key, $options: "i" } }
      ]
    });

    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.status(404).send({ message: "No workers found" });
    }
 
});

app.listen(3500);

