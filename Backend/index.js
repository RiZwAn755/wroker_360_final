const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const multer = require("multer"); // a middleware to upload media 

require("./DB/config");
const client = require("./DB/client");
const worker = require("./DB/worker");
var jwt = require('jsonwebtoken');
const secretKey = "lodu";

// middleware to verify token
const bherifyjwt = (req, resp , next) => {

  const bearerHeader = req.headers['authorization'];
  if (typeof (bearerHeader) !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;

    jwt.verify(req.token, secretKey, (err, authData) => {
      if (!err) {
        req.authData = authData; // Attach auth data to the request
        next();
      }
      else {
        resp.status(401).send({ message: "Invalid token" });
      }
    })
  }
  else {
    resp.status(403).send({ message: "Token not found" });
  }
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads")); // serve uploaded image statically

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// setting up multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')  // store image in uploads folder
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + path.extname(file.originalname)); // to make a unique filename
  }
})

const upload = multer({ storage })

// signup API for client
app.post("/clreg", async (req, resp) => {

  console.log("Received registration request:", req.body);
  let result = new client(req.body);
  await result.save();
  result = result.toObject();
  resp.send(result);

});

app.post("/login", async (req, resp) => {
  let user = await client.findOne({ email: req.body.email, password: req.body.password }).select("-password");

  if (user) {
    jwt.sign({ user }, secretKey, { expiresIn: "3000s" }, (err, token) => {
      if (!err) {
        resp.status(200).send({ user, token }); // Send both user data and token
      } else {
        resp.status(500).send({ message: "Error generating token" });
      }
    });
  } else {
    resp.status(404).send({ message: "Invalid credentials" });
  }



});

app.get("/workList", bherifyjwt, async (req, resp) => {
  //  
  let wrker = await worker.find();
  if (wrker.length > 0) {
    resp.status(201).send(wrker);
  }
  else {
    resp.status(404).send("No wroker Found");
  }
})


app.get('/' , (req,resp) =>{
  resp.send("hola amigo , kaise ho theek ho ?");
})


// signup API for worker
app.post("/wkreg", bherifyjwt, upload.single("picture"), async (req, resp) => {
  try {
    const { name, occupation, experience, wageperhr, location , mobile } = req.body;

    // Store the file name if a file is uploaded
    const picture = req.file ? req.file.filename : null;

    let newWorker = new worker({
      name,
      occupation,
      experience,
      wageperhr,
      location,
      mobile,
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


// search API for finding worker based on wage per hr / loaction /name / occupation
app.get("/search/:key", bherifyjwt, async (req, resp) => {
  try {
    const key = req.params.key;

    // Check if the key is numeric
    const isNumeric = !isNaN(key);

    // Perform a case-insensitive search on multiple fields
    const result = await worker.find({
      $or: [
        isNumeric ? { wageperhr: key } : null, // Match exact wage if numeric
        { location: { $regex: key, $options: "i" } },
        { name: { $regex: key, $options: "i" } },
        { occupation: { $regex: key, $options: "i" } },
      ].filter(Boolean), // Remove null conditions
    });

    if (result.length > 0) {
      resp.status(200).send(result);
    } else {
      resp.status(404).send({ message: "No workers found" });
    }
  } catch (error) {
    console.error("Error during search:", error);
    resp.status(500).send({ error: "Search failed" });
  }
});

app.listen(3500);

