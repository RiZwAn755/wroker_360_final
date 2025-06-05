import { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import "./hireworkers.css";

function Hireworker() {
  const [worker, setWorker] = useState([]);

  const getWorker = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    let response = await fetch("http://localhost:3500/worklist" ,{
      method:"GET",
      headers:{
        Authorization:`bearer ${token}`
      }
    });
   let  wrkr =  await response.json(); // asynchronous task
    
    if (response.ok) {
      
      setWorker(wrkr);
      // console.log(wrkr.location);
    }
   
  };

  const handleHire = async (e) => {
    e.preventDefault();
    alert("Payment to karna padiingaaaa meri Jaaaan");

    const stripe = loadStripe("pk_test_51R8H4AI8b1DNSY4ZPVpPLsvIA1SPvM545REoU9DlI03eFrCAwWdyYd2XXavuf0GLp38c0DrHhJA2csSpZHJRc0Fr00zirJsyKB");

  };

  // Fetch workers when the component loads
  useEffect(() => {
    getWorker();
  }, []);

  const handleSearch = async (e) => {
    let key = e.target.value.trim();
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (key === "") {
      getWorker(); // Reset to all workers if the search bar is cleared
      return;
    }

    let response = await fetch(`http://localhost:3500/search/${key}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      setWorker(result); // Update the worker state with the search results
    } else if (response.status === 404) {
      setWorker([]); // Clear the worker state if no results are found
    } else {
      console.error("Search error:", await response.json());
    }
  };

  return (
    <div className="xx">

      <h1 style={{textAlign:"center" , color:"black"}}>Top workers near you are ...</h1>
      <div className="section">
        <input
          className="searchbar"
          type="text"
          placeholder="Find worker"
          onChange={handleSearch} // Searches on each character
        />

<div className="grid">
  {worker.length > 0 ? (
    worker.map((item, index) => (
      <div className="ingrid" key={index} style={{ display: "flex", alignItems: "center", margin: "20px", border: "1px solid #ccc",  borderRadius: "10px" }}>
        {/* Image on the left */}
        <div style={{ marginRight: "20px" }}>
          <img
            src={`http://localhost:3500/uploads/${item.picture}`}
            alt={`${item.name}'s profile`}
            style={{ width: "180px", height: "300px", borderRadius: "5px" }}
          />
        </div>

        {/* Details on the right */}
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><strong>Name:</strong> {item.name}</li>
            <hr />
            <li><strong>Work-Type:</strong> {item.occupation}</li>
            <hr />
            <li><strong>Exp:</strong> {item.experience}yrs</li>
            <hr />
            <li><strong>Cost:</strong> {item.wageperhr}rs/hr</li>
            <hr />
            <li><strong>Contact & Payment:</strong> +91{item.mobile}</li>
            <hr />
            <li><strong>👍 83% users liked my service</strong></li>
            
            <li><strong>📍Location:</strong> {item.location}</li>
            <li>
              <button
              className="hbtn"
                
                onClick={handleHire}
              >
                Hire me
              </button>
            </li>
          </ul>
        </div>
      </div>
    ))
  ) : (
    <p>No workers found.</p>
  )}
</div>

      </div>
    </div>
  );
}

export default Hireworker;
