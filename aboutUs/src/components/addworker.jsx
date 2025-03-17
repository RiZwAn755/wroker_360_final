import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router";

function AddWorker() {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [occupation, setOccupation] = useState("");
  const [wageperhr, setWageperhr] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handlewrkr= async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:3500/wkreg", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ name, experience,occupation, wageperhr, location }),
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

        <button type="submit"> Reg now</button>
      </form>
    </div>
  );
}

export default AddWorker;