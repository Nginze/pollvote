import axios from 'axios'
import {React, useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router'
import { modalContext } from '../contexts/modalContext'
import '../css/Poll.css'
import Loader from './Loader'





function Poll() {
    const [poll, setPoll] = useState(null)
    const [option, setOption] = useState('')
    const [isLoading, setLoading] = useState(false)
    const {isOpen2, setOpen2} = useContext(modalContext)
    const {id} = useParams()
    const navigate = useNavigate()
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