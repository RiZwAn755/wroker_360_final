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
      getWorker();
      return;
    }

    let response = await fetch(`http://localhost:3500/search/${key}`,{
      method:"GET",
      headers:{
        Authorization:`bearer ${token}`,
      },
    });
   
    if (response.ok) {
      const result = await response.json();
      setWorker(result); // Update the worker state with the search results
    } else {
      const errorData = await response.json();
      console.error("Search error:", errorData.message);
      setWorker([]); // Clear the worker state if no results are found
    }
  };

  return (
    <div className="xx">
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
                      style={{ width: "140px", height: "140px", borderRadius: "20%" }}
                    />
                  </li>
                  <li>Name: {item.name}</li>
                  <li>Work-Type: {item.occupation}</li>
                  <li>Exp: {item.experience}</li>
                  <li>Cost: {item.wageperhr}rs/hr</li>
                  <li>📍 {item.location}</li>
                  <li>
                    <button
                      style={{
                        background: "skyblue",
                        height: "30px",
                        width: "70px",
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
