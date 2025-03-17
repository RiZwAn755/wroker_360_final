import { useState, useEffect } from "react";
import "./hireworkers.css";

function Hireworker() {
  const [worker, setWorker] = useState([]);

  const getProduct = async () => {
    let wrkr = await fetch("http://localhost:3500/worklist");
    wrkr = await wrkr.json();

    // Assuming the response is an array
    if (wrkr.length > 0) {
      setWorker(wrkr);
    }
  };

  const handleHire = (e)=>{
   e.preventDefault();
   alert("payment kar na bhadwe")
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="xx">
      <div className="section">
        <input
          className="searchbar"
          type="text"
          placeholder="Find worker"
        ></input>
        <div className="cc">
          <button className="sbt">🔍</button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Occupation</th>
                <th>Experience</th>
                <th>Fee/hr</th>
                <th>Location</th>
                <th>Hire</th>
              </tr>
            </thead>
            <tbody>
              {worker.length > 0 ? (
                worker.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.name}</td>
                    <td>{item.occupation}</td>
                    <td>{item.experience}</td>
                    <td>${item.wageperhr}</td>
                    <td>{item.location}</td>
                    <td><button style={{backgroundColor:"cornflowerblue" , width:"80%",height:"35px" , borderRadius:"10px"}} onClick={handleHire}>Hire Me</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No workers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Hireworker;
