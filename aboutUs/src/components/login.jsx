import { useState } from "react"
import "./login.css"
import { useNavigate } from "react-router";

function Login()
{
    const navigate = useNavigate();

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("");
    // const [reme, setReme] = useState("false");
   

    const handlesubmit = async (e)=>{
          e.preventDefault();

          let response = await fetch("http://localhost:3500/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
      
          let result = await response.json();
          if (response.ok) {
            alert("Logged in successfully");
            console.log(result);
              // if(e.target.value == "remember me")
            localStorage.setItem("email", email);
            navigate("/");
          } else {
            alert("Enter the correct credentials");
            console.error("Login error:", result);
          }
        };

    return (
        <div className="lgnprnt" >
           <form className = "loginfo" action="" onSubmit={handlesubmit} style={{backgroundColor:"cornflowerblue"}}>
                 <div><h1 style={{color:"black", margin:"20px"}}> welcome Back </h1></div>
                 <input className = "inpt" value = {email} type="text" placeholder="Enter your email"  onChange={(e)=>
                    {
                        setEmail(e.target.value)
                    }
                 }/>
                 <input className = "inpt"  value = {password} type="text" placeholder="enter your password"  onChange={(e)=>
                    {
                        setPassword(e.target.value)
                    }
                 } />
                 <button className = "lognbtn" type="submit"> login </button>
                 <br />
                
                 {/* <input type="checkbox"  id="remember" value="remember me"/> */}
                 {/* <label style={{color:"white" , fontSize:"large"}} htmlFor="reme">remeber me</label> */}
           </form>
          
        </div>
    )
}

export default Login;