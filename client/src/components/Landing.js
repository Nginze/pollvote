import React from 'react'
import Login from './LoginModal'
import '../css/Landing.css'
import TypeAnimation from 'react-type-animation'

export default function () {
  return (
    <div className='home-wrapper'>
      <div className='header-container'>
        <h2 className='header'>Fast, instant <span className='header-span'>realtime</span> polls</h2> 
        <h2 className='header'>for any
           <TypeAnimation
              className = 'typed-text'
              cursor={false}
              sequence={[' social audience', 4000, ' task', 4000, ' debate', 4000, ' discussion', 4000]}
              wrapper= 'span'
              repeat = {Infinity}

            />
       </h2> 
      </div>
        <a className='poll-link' href='/new'> Create your poll</a>
        <p className='sub'>No registration required, it's 100% free and takes less than a minute.</p>
        <div className='integrations'>
             <div className='integrations-header'>Supported integrations</div>
             <div className='integrations-icons'>
                <p className='integration-icon'><i className="fa-brands fa-facebook-square"></i></p>
                <p className='integration-icon'><i className="fa-brands fa-whatsapp-square"></i></p>
                <p className='integration-icon'><i className="fa-brands fa-linkedin"></i></p>
                <p className='integration-icon'><i className="fa-brands fa-slack"></i></p>
                <p className='integration-icon'><i className="fa-brands fa-telegram"></i></p>
             </div>
      
        </div>
        <Login />
    </div>
  )
}
