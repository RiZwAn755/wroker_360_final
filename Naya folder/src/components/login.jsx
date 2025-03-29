import { useState } from "react"
import "./login.css"
import { useNavigate } from "react-router";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");



  const handlesubmit = async (e) => {
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

      localStorage.setItem("token", result.token);

      localStorage.setItem("email", email);
      navigate("/");
    } else {
      alert("Enter the correct credentials");
      console.error("Login error:", result);
    }
  };

  return (
    <div className="lgnprnt" >


      <form className="loginfo" action="" onSubmit={handlesubmit} style={{ backgroundColor: "white", boxShadow: " 0px 4px 10px rgba(0, 0, 0, 10)"  }}>
        <div><h1 style={{ color: "black", margin: "20px" }}> welcome Back </h1></div>
        <input className="inpt" value={email} type="text" placeholder="Enter your email" onChange={(e) => {
          setEmail(e.target.value)
        }
        } />
        <input className="inpt" value={password} type="text" placeholder="enter your password" onChange={(e) => {
          setPassword(e.target.value)
        }
        } />
        <button className="lognbtn" type="submit"> login </button>
        <br />

        <GoogleLogin
          onSuccess={credentialResponse => {
            // console.log(credentialResponse);

            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

            console.log(credentialResponseDecoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />



      </form>





    </div>
  )
}

export default Login;