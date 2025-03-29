import './hero.css'
import { useNavigate } from 'react-router';

import bgvid from "./vid2.mp4"

function Hero() 
{

  const navigate = useNavigate();

  const handlebtn = ()=>{

            navigate('/hireworker');
  }
    return (

        <div className="Parent">
              
              <div className='Image'>
              <video
          src={bgvid}
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        />
             
 </div>

               <div className='Texts'>

                 <div className= 'Text1'>
                      Services  At Your DoorStep 
                </div>

                <div className='Text2'>
                   
                        From Home Repairs To Beauty
                        Serives 
                        <br />We Bring Trusted 
                        <br />
                        Professionals To You WhereEver You Are.                     

                </div>
                
                <div className='btn'  >
                  <button className='click' onClick={handlebtn}>
                    <h3>Hire Worker</h3>
                   </button>
              </div>

              </div>

              
            
        </div>
    )
     

}

export default Hero;