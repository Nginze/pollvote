import axios from 'axios'
import {React, useState, useEffect, useContext} from 'react'
import ReactModal from 'react-modal'
import { useParams, useNavigate } from 'react-router'
import { modalContext } from '../contexts/modalContext'
import { userContext } from '../contexts/userContext'
import '../css/Poll.css'
import Loader from './Loader'






function Poll() {
    const [poll, setPoll] = useState(null)
    const [option, setOption] = useState('')
    const [isLoading, setLoading] = useState(false)
    const {setOpen2} = useContext(modalContext)
    const {user} = useContext(userContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const googleAuth = () => {
        window.open('http://localhost:8080/auth/google')
      }
    const getResult = (id) => {
        setLoading(true)
        axios.get('http://localhost:8080/polls/public/' + id, {
          withCredentials: true
        })
           .then(response => {
               if(response){
                   setPoll(response.data.poll)
                   setLoading(false)
               }
               

            })
     }

     useEffect(() => {
        
        getResult(id)
       
     }, [id]);
   const submitVote = () =>{
        axios({
            method:'post',
            url: 'http://localhost:8080/polls/poll/' + id,
            withCredentials: true,
            data:{
                option
            }
        })
            .then((response)=>{
                if(response){
                    navigate('/poll/result/' +id)
                    setOpen2(true)
                }
            })
   }

  return (
     <div className='poll'>
        {isLoading && <Loader/>}
        {poll && !user && poll.loginToVote &&
        <div className='modal-wrapper'>
        <ReactModal className='login-modal animate__animated animate__fadeInRight animate__faster'
                    overlayClassName = 'login-modal-overlay'
                    isOpen={true}
                   
                    >
            <h2 className='header-modal'>Sign in to</h2>
            <h1 className='logo-modal'><i class="fa-solid fa-square-poll-vertical"></i> pollVote</h1> 
            <p className='sub-modal'>Login to vote on this poll</p>
            <button className='login-button' onClick={googleAuth}> <i className="fa-brands fa-google"></i>Sign in with Google</button>
        </ReactModal>
    </div>
        }
        {!isLoading && <h2>{poll && poll.question}</h2>}
        {poll && poll.options.map((option)=>{
            return (
                <label key={option._id}>
                    <div className='radio-option'>
                        <input type='radio' name='selection' value={option.title} onChange={(e)=>{setOption(e.target.value)}}/>  
                        <p>{option.title}</p>
                    </div>
                </label>
              
            )
            
        })}
             <button onClick={submitVote}className='submit'>Submit Vote</button>   
     

    </div>
  )
}

export default Poll