import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { userContext } from '../contexts/userContext'
import '../css/CommentSection.css'
import 'animate.css'
import LikeButton from './LikeButton'



function CommentSection() {
  const [comments, setComments] = useState(null)
  const {user} = useContext(userContext)
  const {id} = useParams()
  const [comment, setComment] = useState('')
  const googleAuth = ()=>{
    window.open('http://localhost:8080/auth/google')
  }
  const postComment = () => {
      const commentObject = {
        user:user? user.username : user.username,
        comment,
        imageUrl: user.image
      }
      axios({
        method: 'post',
        url: 'http://localhost:8080/polls/comments/'+id,
        withCredentials: true,
        data:commentObject
        })
  }
  const getResult = () => {
      axios.get('http://localhost:8080/polls/comments/' + id, {
        withCredentials: true
      })
        .then(response => {
          if(response){
            setComments(response.data)
          }
        
          })
 }
 useEffect(()=>{
   getResult()
 })
  return (
   user ? <div className='comment-section'>
      <div className='comment-section-container'>
          <div className='comments-container'>
            <div className='comments-header'>
                <h2>Comments</h2>
               { comments && <span>{comments.length} comments</span>}
            
            </div>
            <hr></hr>
            {comments && comments.map((comment)=>{
                        
                  return <div className ='animate__animated animate__fadeInUp'key ={comment._id}>
                        <div  className='comment'>
                         { user &&  <img src= {comment.imageUrl}></img>}
                            <div className='content'>
                              <h3>{comment.user}</h3>
                              <p>{comment.comment}</p>
                              <span>{moment(comment.date).fromNow()}<LikeButton comment={comment}/> <span className='likes-count'>{comment.likes} </span></span>
                            </div>
              
                          </div>
                          <hr></hr>
                          </div>
                        
                         
                          
            })}
          </div>
          <div className='comment-form'>
          { user && <img src= {user.image}></img>}
            <div className='comment-form-wrapper'>
              <input value={comment} onChange = {(e)=>{setComment(e.target.value)}}className='comment-input' placeholder='Write comment'/>
              <button onClick={postComment}>Post comment <i class="fa-solid fa-paper-plane"></i> </button>
            </div> 
            
                </div>
            </div>
      
    </div> : <>
            <hr id ="comment-border"></hr>
            <div id= "comment-login-prompt" className='comment-section'>
              <h2>Login to post a comment</h2>
              <p>Don't have an account? Signing up takes 20 seconds and is completly free</p>
              <button id='comment-login' className='login-button' onClick={googleAuth}> <i className="fa-brands fa-google"></i>Sign in with Google</button>
            </div>
             </>
  )
}

export default CommentSection