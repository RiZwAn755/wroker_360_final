import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router";

function AddWorker() {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [occupation, setOccupation] = useState("");
  const [wageperhr, setWageperhr] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [picture, setPicture] = useState(null);

  const navigate = useNavigate();

  const handlewrkr = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("experience", experience);
    formData.append("occupation", occupation);
    formData.append("wageperhr", wageperhr);
    formData.append("location", location);
    formData.append("mobile", mobile);
    
    if (picture) formData.append("picture", picture);

    try {
      const res = await fetch("http://localhost:3500/wkreg", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`, 
        },
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        alert("Worker profile created successfully");
        console.log("Worker details:", result);
        navigate("/hireworker");
      } else {
        const errorData = await res.json();
        console.error("Error:", errorData.message);
        alert(errorData.message || "Failed to register worker");
      }
    } catch (error) {
      console.error("Error during worker registration:", error);
      alert("An error occurred while registering the worker");
    }
  };

  return (
    <div className="sgnup">
      <form className="frm" action="" onSubmit={handlewrkr} style={{border:"1px solid black",  boxShadow: "0px 4px 10px rgba(0, 0, 0, 9)"}}>
        <h1 style={{ textAlign: "center", color: "black" }}>
          New Worker Registration
        </h1>

        <label
          htmlFor="pp"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "0px",
            
          }}
        >
          Upload your profile picture
        </label>
        <input
          style={{
            color: "cornflowerblue",
            margin: "10px",
            width: "60%",
            border: "1px solid cornflowerblue",
            padding: "10px",
          }}
          type="file"
          id="pp"
          name="picture"
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
          placeholder="Enter your full name "
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          className="ip"
          value={experience}
          type="text"
          placeholder="Enter your experience in years"
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
          placeholder="Enter your fees per hour in rupees"
          onChange={(e) => {
            setWageperhr(e.target.value);
          }}
        />

        <input
          className="ip"
          value={location}
          type="text"
          placeholder="Locations where you are available"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
               
               <input
          className="ip"
          value={mobile}
          type="text"
          placeholder="Enter your Mobile Number "
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />

        <button
          type="submit"
          className="sgnupbtn"
        >
          Register now
        </button>
      </form>
    </div>
  );
}

export default AddWorker;