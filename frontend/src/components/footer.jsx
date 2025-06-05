
import './footer.css'
import { Link } from 'react-router';
function Footer(){

    return (

        <>
        <div className="cmp">
                   
                   <div className="cmp1">
                     <h3> <Link to = "aboutus">AboutUs</Link></h3>
                     <h3><Link to = "/">FAQ</Link></h3>
                     <h3><Link to = "/">Terms & conditions</Link></h3>
                   </div>
                   <div className="cmp2">
                    <h3><Link to = "/">ContactUs</Link></h3>
                    <h3><Link to = "/">Feedback</Link></h3>
                    <h3><Link to = "/">Raise Query</Link></h3>
                   </div>
                   <div className="cmp3">
                   <ul className='scm'>
                    <li><h2>Connect with Us</h2></li>
                    <li><Link to="https://www.linkedin.com/in/md-rizwan-3b3141255/"><img src="" alt="" />Instagram </Link> </li>
                    <li><Link to="https://www.linkedin.com/in/md-rizwan-3b3141255/"><img src="" alt="" />Linkedin </Link> </li>
                    <li> <Link to ="mdrizwan6386@gmail.com"><img src="" alt="" />Email</Link> </li>

                   </ul>

                   
                   </div>
                  
        </div>
         <h4 style={{textAlign:"center" , backgroundColor:"white"}}> <i>All rights are reserved to @</i><span>Worker<span style={{color:"orange"}}>360 </span></span>  2025</h4>
         </>
    )
}

export default Footer;