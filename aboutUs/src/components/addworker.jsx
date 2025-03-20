import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router";

function AddWorker() {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [occupation, setOccupation] = useState("");
  const [wageperhr, setWageperhr] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState(null);


  const navigate = useNavigate();

  const handlewrkr = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("experience", experience);
    formData.append("occupation", occupation);
    formData.append("wageperhr", wageperhr);
    formData.append("location", location);
    if (picture)
      formData.append("picture", picture);


    const res = await fetch("http://localhost:3500/wkreg", {
      method: "POST",
      body: formData,
    });

    let result = await res.json();
    alert("worker profile created sucessfully");
    console.log("worker details : ", result);
    navigate('/hireworker');
  };

  return (
    <div className="sgnup">

      <form className="frm" action="" onSubmit={handlewrkr}>
        <h1 style={{ textAlign: "center", color: "black" }}>
          New Worker Registration
        </h1>

<label htmlFor="pp" style={{textAlign:"center" , marginTop:"10px" , marginBottom:"0px"}}>Upload your profile picture</label>
        <input
        style={{color:"cornflowerblue" , margin:"10px" , width:"60%" , border:"1px solid cornflowerblue" , padding:"10px"}}
          type="file"
          id="pp"
          name="picture" // This must match the key expected by multer in the backend
          accept="image/*"
          
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setPicture(e.target.files[0]);
            }
          }}
        />

        <input
        
          className="ip"
          value={name}
          type="text"
          placeholder="Enter your full name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          className="ip"
          value={experience}
          type="text"
          placeholder="Enter your experience"
          onChange={(e) => {
            setExperience(e.target.value);
          }}
        />

        <input
          className="ip"
          value={occupation}
          type="text"
          placeholder="Enter your occupation"
          onChange={(e) => {
            setOccupation(e.target.value);
          }}
        />

        <input
          className="ip"
          value={wageperhr}
          type="text"
          placeholder="Enter your fees per hour"
          onChange={(e) => {
            setWageperhr(e.target.value);
          }}
        />

        <input
          className="ip"
          value={location}
          type="text"
          placeholder="Enter your location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />

        <button type="submit" style={{width:"100px" , height:"30px" , backgroundColor:"skyblue" , borderRadius:"10px" , cursor : "grabbing"}}>Register now</button>
      </form>
    </div>
  );
}

export default AddWorker;