import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("email"); 

  return (
    <div className="navBar">
      <div className="logo">
        <a href="/" className='logos'>
          <span style={{ color: "black" }}>Worker</span>
          <span style={{ color: "#ff9100" }}>360</span>
        </a>
      </div>

      <div className="navLinks">
        {auth ? (
          <ul className="ull">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hireworker">Hireworker</Link></li>
            <li><Link to="/addworker">Worker Registration</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li>
              <a
                onClick={() => {
                  localStorage.clear();
                  alert("Logged out successfully");
                 navigate("/login");
                }}
                style={{ cursor: "pointer" }} // ✅ Added pointer cursor for better UX
              >
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul className="ull">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
}
