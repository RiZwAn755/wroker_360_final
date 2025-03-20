import { useState, useEffect } from "react";
import "./hireworkers.css";

function Hireworker() {
  const [worker, setWorker] = useState([]);

  const getWorker = async () => {
    let wrkr = await fetch("http://localhost:3500/worklist");
    wrkr = await wrkr.json();

    // Assuming the response is an array
    if (wrkr.length > 0) {
      setWorker(wrkr);
      // console.log(wrkr.location);
    }
  };

  const handleHire = (e) => {
    e.preventDefault();
    alert("Payment kar");
  };

  // Fetch workers when the component loads
  useEffect(() => {
    getWorker();
  }, []);

  const handleSearch = async (e) => {
    let key = e.target.value.trim();

    if (key === "") {
      getWorker();
      return;
    }

    let response = await fetch(`http://localhost:3500/search/${key}`);
    let result = await response.json();

    if (result.length > 0) {
      setWorker(result);
    } else {
      setWorker([]);
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
