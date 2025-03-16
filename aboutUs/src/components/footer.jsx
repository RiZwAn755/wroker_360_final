
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
                    <li><a href=""><img src="" alt="" />Instagram </a> </li>
                    <li><a href=""><img src="" alt="" />Linkedin </a> </li>
                    <li> <a href=""><img src="" alt="" />Email</a> </li>

                   </ul>

                   
                   </div>
                  
        </div>
         <h4 style={{textAlign:"center" , backgroundColor:"cornflowerblue"}}> <i>All rights are reserved to </i><span>Worker<span style={{color:"orange"}}>360 </span></span></h4>
         </>
    )
}

export default Footer;