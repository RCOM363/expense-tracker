import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div style={{maxHeight:'100vh',overflowY:"hidden"}}>
      <div className="home-container">
        <div className="content">
          <h1><span>C</span>ash Log</h1><br></br>
          <p>Log your Cash to track, analyze & improve you finance.</p>
          <div className='button_container'>
            <Link to="Signup" className='linkb'>SignUp</Link>
            <Link to="signin" className='linkb'>SignIn</Link>
          </div>
        </div>
      <div className='img'>
      <img src="/Budget.png" alt="Budget" />
      </div>
      </div>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fillOpacity="1" d="M0,288L40,282.7C80,277,160,267,240,272C320,277,400,299,480,288C560,277,640,235,720,202.7C800,171,880,149,960,160C1040,171,1120,213,1200,208C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
    </div>
  );
}

export default Home