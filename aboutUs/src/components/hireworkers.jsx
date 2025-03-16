     import "./hireworkers.css"
      import pic from "../assets/men.jpg"
      import pic1 from "../assets/picc.jpg"
      import { Link } from "react-router"
     
     function Hireworker() {

        return (
            <>
               <div className="section">
                             

                             <input className = "searchbar" type="text" placeholder="Find worker" ></input>
                             <div className="cc">< button className="sbt">🔍</button></div>
                             

                   </div>
            </>
        )
     }

     export default Hireworker;