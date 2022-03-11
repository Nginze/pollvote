import axios from 'axios'
import {React, useEffect, useState,useContext} from 'react'
import { useParams } from 'react-router'
import ProgressBar from 'react-percent-bar';
import '../css/PollResult.css'
import Loader from './Loader';
import moment from 'moment';
import 'animate.css'
import ReactModal from 'react-modal';
import { modalContext } from '../contexts/modalContext';


function PollResult() {
    const colorMap = {
      "Web Development":"#85feb5",
      "Books":"#83c8fe",
      "Drink":"#aec5e1",
      "Movies":"#83c8fe",
      "Politics":"#feaea7",
      "Music":"#feaea7",
      "News":"#aec5e1",
      "Gaming":"#afbffe",
      "Football":"#c9ffb7",
      "History":"#ffb776",
      "Sport": "#b7f1cd",
      "Random":"#fffcb8"

    }
    const [poll, setPoll] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [hasVoted, setVoted] = useState(null)
    const [isOpen, setOpen] = useState(false)
    const {isOpen2, setOpen2} = useContext(modalContext)
    const highestVote = ' highest-vote'
    const [fillColor] = useState("rgba(59, 219, 59, 0.616)")
    const {id} = useParams()
    const getResult = (id) => {
        setLoading(true)
          axios.get('http://localhost:8080/polls/public/' + id, {
            withCredentials: true
          })
            .then(response => {
              if(response){
                setPoll(response.data.poll)
                setVoted(response.data.hasVoted)
                setLoading(false)
              }
            
              })
     }

     useEffect(() => {
     
        getResult(id)
       
     }, [id]);
  
  return (
    
     <div className='result-wrapper'>
     <ReactModal 
       className='animate__animated animate__fadeIn animate__faster'
       isOpen={isOpen2} 
       style={{
         content:{
           width:'20vw',
           height: '40vh',
           margin: 'auto',
           position: 'absolute',
           top: '40px',
           left: '40px',
           right: '40px',
           bottom: '40px',
           border: '1px solid #ccc',
           background: '#fff',
           overflow: 'auto',
           WebkitOverflowScrolling: 'touch',
           borderRadius: '4px',
           outline: 'none',
           padding: '20px'

         },
         overlay:{
           background:"rgba(90, 90, 90, 0.418)"
         }
         
       }}>
        <button className='close' onClick={()=>{setOpen2(false)}}><i class="fa-solid fa-xmark"></i></button>
        <h2 className='share-modal-header'>Thanks for your vote!</h2>
        <span className='copy-modal-sub'>This is a public poll now that you’ve voted why not share it?</span>
        <div className='share-links2'>
              <span>Share</span>
              {<button onClick={()=>{setOpen(true);setOpen2(false)}}><i class="fa-solid fa-link"></i>Share to clipboard</button>}
        </div>
       
       </ReactModal>
       <ReactModal 
       className='animate__animated animate__fadeIn animate__faster'
       isOpen={isOpen} 
       style={{
         content:{
           width:'30vw',
           height: '49vh',
           margin: 'auto',
           position: 'absolute',
           top: '40px',
           left: '40px',
           right: '40px',
           bottom: '40px',
           border: '1px solid #ccc',
           background: '#fff',
           overflow: 'auto',
           WebkitOverflowScrolling: 'touch',
           borderRadius: '4px',
           outline: 'none',
           padding: '20px'

         },
         overlay:{
           background:"rgba(90, 90, 90, 0.418)"
         }
         
       }}>
        <button className='close' onClick={()=>{setOpen(false)}}><i class="fa-solid fa-xmark"></i></button>
        <h2 className='copy-modal-header'>Share link</h2>
        <span className='copy-modal-sub'>Copy a link below to easily share this poll</span>
        <p className='link-label'>Poll results link</p>
        <div className='copy'><p>http://localhost:3000/poll/result/{id}</p><button onClick={() =>  navigator.clipboard.writeText(`http://localhost:3000/poll/result/${id}`)} >Copy Link</button></div>
        <p className='link-label'>Poll vote link</p>
        <div className='copy'><p>http://localhost:3000/poll/{id}</p><button onClick={() =>  navigator.clipboard.writeText(`http://localhost:3000/poll/${id}`)} >Copy Link</button></div>
       
       
       </ReactModal>
       <div className='results'>
            {isLoading && <Loader/>}
            {poll && <p style={{background:colorMap[poll.category]}}>{poll.category}</p>}
            {poll && <h2 className='result-header'>{poll.question}<div><span>Asked by {poll.user} about {moment(poll.date).fromNow()}</span></div></h2>}
            {poll &&  poll.options.sort((a,b) => a.selections- b.selections).reverse().map((option) => {
                
                return <div className = {`option ${option.selections * 100/poll.votes > 50 ? highestVote : ""}`} key={option._id}>
                            <h2>{option.title}<span>{poll.votes === 0 ? 0 : Math.floor(option.selections * 100/poll.votes)}%</span></h2>
                            <ProgressBar colorShift={false} fillColor= {fillColor} percent={poll.votes === 0 ? 0 : Math.floor(option.selections * 100/poll.votes)} width='' height='10px' />
                       </div>
                       
            })}

       </div>
       {poll && <div className='mini-dash'>

          {hasVoted ? <div className='vote-alert'><i class="fa-solid fa-circle-exclamation"></i>You have voted on this poll already</div> : <a href={'/poll/'+ id }className='submit-vote'>Submit Vote</a>}
           <div className='display'>
                <div className='vote-data'>
                  <span>Votes</span> 
                  <h2>{poll && poll.votes}</h2>
                  <hr/>
                </div>
            
                <div className='share-links'>
                    <span>Share</span>
                    {<button onClick={()=>{setOpen(true)}}><i class="fa-solid fa-link"></i>Share to clipboard</button>}
                </div>
           </div>

       </div>}
    </div>
  )
}

export default PollResult