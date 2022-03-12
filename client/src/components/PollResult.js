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
import CommentSection from './CommentSection';
import { userContext } from '../contexts/userContext';
import QRCode from "react-qr-code";



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
    const [isOpen3, setOpen3] = useState(false)
    const [qrToggle, setQrToggle] = useState(false)
    const {user} = useContext(userContext)
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
     <>
        <div className='result-wrapper'>
        <ReactModal 
          className='animate__animated animate__fadeIn animate__faster'
          isOpen={isOpen3}
          style={{
            content:{
              width:'30vw',
              height: '50vh',
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
              padding: '20px',
              display: 'flex',
              justifyContent:'center',
              flexDirection:'column',
              alignItems: 'center'

            },
            overlay:{
              background:"rgba(90, 90, 90, 0.418)"
            }}}>
          <div className='QR-header'>
             <button className='close' id='qr-close'onClick={()=>{setOpen3(false)}}><i class="fa-solid fa-xmark"></i></button>
             <h2>QR Code</h2>
             <p>Use this at a public event or confrenece to allow large groups of people to access the poll url easily. The QR code is unique to this poll.</p>
          </div>
       
         {!qrToggle ? <QRCode value={`http://localhost:3000/poll/${id}`} size='150'/> : <QRCode value={`http://localhost:3000/poll/result/${id}`} size='150'/>}
         {!qrToggle ? <button onClick={()=>{setQrToggle(!qrToggle)}} className='QR-toggle'>Vote Results QR-Code</button> : <button onClick={()=>{setQrToggle(!qrToggle)}} className='QR-toggle'>Vote Poll QR-Code</button>}
        </ReactModal>
        <ReactModal 
          className='animate__animated animate__fadeIn animate__faster'
          isOpen={isOpen2} 
          style={{
            content:{
              width:'22vw',
              height: '50vh',
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
            <div className='share-links'>
                        <span style={{textAlign:'center'}}>Share</span>
                        <div>
                          <a onClick={()=>{setOpen(true); setOpen2(false)}}><i class="fa-solid fa-link"></i> Share to clipboard</a>
                          <a href={`https://wa.me/?text=What is your take on this!?-Vote now at http://localhost:3000/poll/${id}`} target='_blank' className='whatsapp-link'>    <i class="fa-brands fa-whatsapp"></i> Share to Whatsapp</a>
                          <a href = {`http://twitter.com/share?text=What is your take on this!?-Vote now at&url=http://localhost:3000/poll/${id}`} target='_blank' className='twitter-link'><i class="fa-brands fa-twitter"></i> Share to twitter</a>
                          <a onClick={()=>{setOpen3(true);setOpen2(false)}} id='QR-code'><i class="fa-solid fa-qrcode"></i> Share QR code</a>
                        </div>
                    </div>
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
                        <div>
                          <a onClick={()=>{setOpen(true)}}><i class="fa-solid fa-link"></i> Share to clipboard</a>
                          <a href={`https://wa.me/?text=What is your take on this!?-Vote now at http://localhost:3000/poll/${id}`} target='_blank' className='whatsapp-link'>    <i class="fa-brands fa-whatsapp"></i> Share to Whatsapp</a>
                          <a href = {`http://twitter.com/share?text=What is your take on this!?-Vote now at&url=http://localhost:3000/poll/${id}`} target='_blank' className='twitter-link'><i class="fa-brands fa-twitter"></i> Share to twitter</a>
                          <a onClick={()=>{setOpen3(true)}} id='QR-code'><i class="fa-solid fa-qrcode"></i> Share QR code</a>
                        </div>
                    </div>
              </div>

          </div>}
        
        </div>
        {poll && poll.addComments && <CommentSection/>}
        </>
  )
}

export default PollResult