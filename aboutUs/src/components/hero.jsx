import './hero.css'
import { useNavigate } from 'react-router';
import Hireworker from './hireworkers';

function Hero() 
{

  const navigate = useNavigate();

  const handlebtn = ()=>{

            navigate('/hireworker');
  }
    return (

        <div className="Parent">
              
              <div className='Image'>
                <img src="../assets/bg.png" alt="" />
             
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