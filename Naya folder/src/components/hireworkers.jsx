import { useState, useEffect } from "react";
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

  const handleHire = (e) => {
    e.preventDefault();
    alert("Payment to karna padiingaaaa meri Jaaaan");
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

      <h1>Top workers near you are ...</h1>
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
              <div className="ingrid" key={index}>
                <ul>
                  <li>
                    <img
                      src={`http://localhost:3500/uploads/${item.picture}`} // Construct the image URL
                      alt={`${item.name}'s profile`}
                      style={{ marginTop:"100px" , width: "140px", height: "140px", borderRadius: "20%" }}
                    />
                    <hr style={{color:"orange"}} />
                  </li>
                  <li>Name: {item.name}</li>
                  <li>Work-Type: {item.occupation}</li>
                  <li>Exp: {item.experience}</li>
                  <li>Cost: {item.wageperhr}rs/hr</li>
                  <li>Contact: +91{item.mobile}</li>
                  <li>📍Location: {item.location}</li>
                  <li>
                    <button
                      style={{
                        margin:"10px",
                        background:" white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)",
                        background: "linear-gradient(to right, #fefefe, #ffcc80, #ff9800) ",
                        marginBottom:"20px",
                        height: "30px",
                        width: "200px",
                        border:"0px",
                        borderRadius: "10px",
                        cursor: "grab",
                      }}
                      onClick={handleHire}
                    >
                      Hire me
                    </button>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <h1>No worker Here</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hireworker;
