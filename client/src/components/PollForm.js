import React, { useState } from 'react'
import '../css/PollForm.css'
import axios from 'axios'
import Login from './LoginModal'
import { useNavigate } from 'react-router'

function PollForm() {
  const [question, setquestion] = useState('')
  const [option1, setoption1] = useState('')
  const [option2, setoption2] = useState('')
  const navigate = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    const poll = {
      question,
      option1,
      option2
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
                <button onClick={submit}>Create Poll</button>
          </div>
        </form>
        
    </div>
  )
}

export default PollForm