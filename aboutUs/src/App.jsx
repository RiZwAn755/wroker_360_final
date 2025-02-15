import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs"


function App() {
  
      
     return (
           
       <>
       <Router>

       
       <Routes>

        <Route path="/" element = {<AboutUs/>}> </Route>

       </Routes>
       </Router>
       
       </>
     )
}

export default App;