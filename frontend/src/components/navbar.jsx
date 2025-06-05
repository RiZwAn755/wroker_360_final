import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("email");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-secondary">Worker</span>
              <span className="text-primary">360</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {auth ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
                <Link to="/hireworker" className="text-gray-700 hover:text-primary">Hire Worker</Link>
                <Link to="/addworker" className="text-gray-700 hover:text-primary">Register as Worker</Link>
                <Link to="/aboutus" className="text-gray-700 hover:text-primary">About Us</Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/signup" className="btn bg-primary text-white hover:bg-primary/90">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {auth ? (
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Home</Link>
                <Link to="/hireworker" className="text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Hire Worker</Link>
                <Link to="/addworker" className="text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">Register as Worker</Link>
                <Link to="/aboutus" className="text-gray-700 hover:text-primary px-4 py-2 rounded-md hover:bg-gray-100">About Us</Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="btn w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login" className="btn w-full text-center">Login</Link>
                <Link to="/signup" className="btn w-full text-center bg-primary text-white hover:bg-primary/90">Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}