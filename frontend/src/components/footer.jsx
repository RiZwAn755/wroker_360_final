import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-2">
              <li><Link to="/aboutus" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">FAQ</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Feedback</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Raise Query</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect with Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="https://www.instagram.com" className="text-gray-600 hover:text-primary flex items-center space-x-2">
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link to="https://www.linkedin.com" className="text-gray-600 hover:text-primary flex items-center space-x-2">
                  <span>LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link to="mailto:contact@worker360.com" className="text-gray-600 hover:text-primary flex items-center space-x-2">
                  <span>Email</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Worker<span className="text-primary">360</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;