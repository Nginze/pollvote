import {useContext} from 'react'
import ReactModal from 'react-modal';
import {modalContext} from '../contexts/modalContext';
import '../css/Login.css'
import 'animate.css'



export default function () {

  const {isOpen, setIsOpen} = useContext(modalContext)

  const googleAuth = () => {
    window.open('http://localhost:8080/auth/google')
  }

  return (
    
    <div className='modal-wrapper'>
        <ReactModal className='login-modal animate__animated animate__fadeInRight animate__faster'
                    overlayClassName = 'login-modal-overlay'
                    isOpen={isOpen}
                    onRequestClose={()=>{setIsOpen(false)}}
                    >
            <button className='close' onClick={()=>{setIsOpen(false)}}><i class="fa-solid fa-xmark"></i></button>
            <h2 className='header-modal'>Sign in to</h2>
            <h1 className='logo-modal'><i class="fa-solid fa-square-poll-vertical"></i> pollVote</h1> 
            <p className='sub-modal'>Login and create your first poll today</p>
            <button className='login-button' onClick={googleAuth}> <i className="fa-brands fa-google"></i>Sign in with Google</button>
        </ReactModal>
    </div>
  )
}
