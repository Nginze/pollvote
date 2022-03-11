import React, { useContext, useState } from 'react'
import '../css/PollForm.css'
import axios from 'axios'
import { userContext } from '../contexts/userContext'


function PollForm() {
  const [question, setquestion] = useState('')
  const [option1, setoption1] = useState('')
  const [option2, setoption2] = useState('')
  const [category, setCategory] = useState('Web Development')
  const [visibility, setVisibility] = useState('Public')
  const [multipleVotes, setMultipleVotes] = useState(false)
  const [loginToVote, setLoginToVote] = useState(false)
  const [addComments, setAddComments] = useState(false)
  const {user} = useContext(userContext)
  const submit = (e)=>{
    e.preventDefault()
    const poll = {
      user:user ? user.username : 'Anonymous',
      user_id: user ? user._id : "1e7cd5d751299613416ead0a8dbfedc1",
      question,
      option1,
      option2,
      category, 
      visibility,
      multipleVotes,
      loginToVote,
      addComments
    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/polls/public',
      withCredentials: true,
      data:poll
      })
      .then(window.open('/public', "_self"))
      .catch(err => {console.log(err)})
      

  }
  return (
    <div className='poll-form'>
        <h2>Create a poll</h2>
        <p>Complete the fields below to create your poll</p>
        <form>
          <div className='form-wrapper'>
                <div className='poll-question'>
                    <label for='pollquestion'>Poll question</label>
                    <input name='pollquestion' placeholder='Eg. What is you favourite video game' value = {question} onChange={(e)=>{setquestion(e.target.value)}}/>
                </div>
                <div className='poll-option'>
                    <label for='option1'>Option 1</label>
                    <input name='option1' placeholder='Eg. Option1' value={option1} onChange={(e)=>{setoption1(e.target.value)}}/>
                </div>
                <div className='poll-option'>
                    <label for='option2'>Option 2</label>
                    <input name='option2' placeholder='Eg. Option2' value={option2} onChange={(e)=>{setoption2(e.target.value)}}/>
                </div>
                <div className='poll-select-container'>
                    <div className='poll-select'>
                        <label for="poll-category"> Poll category</label>
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}} name="poll-category" id="poll-category">
                          <option value="Web Development">Web Development</option>
                          <option value="Books">Books</option>
                          <option value="Drink">Drink</option>
                          <option value="Movies">Movies</option>
                          <option value="Politics">Politics</option>
                          <option value="News">News</option>
                          <option value="Music">Music</option>
                          <option value="Gaming">Gaming</option>
                          <option value="Football">Football</option>
                          <option value="History">History</option>
                          <option value="Sport">Sport</option>
                          <option value="Random">Random</option>
                        </select>
                    </div>
                    <div className='poll-select'>
                        <label for="poll-category"> Poll visibility</label>
                        <select value={visibility}  onChange ={(e)=>{setVisibility(e.target.value)}}name="poll-category" id="poll-category">
                          <option value="Public">Public</option>
                          {user ? <option value="Private">Private</option> : <option value="Private" disabled='disabled' >Private(login to create a private post)</option>}
                        </select>
                    </div>
                </div>
                <label>Poll options</label>
                <div className='poll-options'>
                  <div>
                    
                    <div className='setting'>
                      <input value={multipleVotes} onChange={(e)=>{setMultipleVotes(e.target.checked)}} type='checkbox'/>
                      Allow Multiple Votes
                    </div >
                  </div>
               
                  <div className='setting'>
                   
                    <input  value={loginToVote} onChange={(e)=>{setLoginToVote(e.target.checked)}} type='checkbox'/>
                      Login to Vote

                  </div>
                  <div className='setting'>
                    <input value={addComments} onChange={(e)=>{setAddComments(e.target.checked)}} type='checkbox'/>
                    Add Comments
                  </div>
                </div>
               
                <button onClick={submit}>Create Poll</button>
          </div>
        </form>
        
    </div>
  )
}

export default PollForm