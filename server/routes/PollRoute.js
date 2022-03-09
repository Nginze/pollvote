const {Router} = require('express')
const router = Router()
const Poll = require('../models/PollModel.js')

const signVote = (req, res, next) => {
    if(!req.session.submittedVotes){
        req.session.submittedVotes = []
    }
    req.session.submittedVotes.push(req.params.id)
    next()
 
}

const hasVoted = (req,res,next) => {
    if(!req.session.submittedVotes){
        req.session.submittedVotes = []
    }
    if(req.session.submittedVotes.includes(req.params.id)){
        const hasVoted = true
        req.hasVoted = hasVoted
    }
    else{
       const hasVoted = false
       req.hasVoted = hasVoted
    }
    next()

}
router.get('/public', (req, res) =>{
    
    Poll.find().then(users => {res.json(users)})
    
})
router.get('/public/:id',hasVoted, (req, res) =>{
    Poll.findOne({_id:req.params.id})
        .then(poll => {res.json({poll,hasVoted:req.hasVoted})})
    
})

router.post('/public', (req, res) =>{
   
    const newPoll = new Poll({
        question: req.body.question,
        options: [{title:req.body.option1}, {title:req.body.option2}]
    })
    newPoll.save()

})

router.post('/poll/:id',signVote, (req, res) =>{

    Poll.findOneAndUpdate(
        {_id: req.params.id},
        {$inc: {
            "options.$[el].selections": 1 ,
            "votes":1
          }
        },
        { 
          arrayFilters: [{ "el.title": req.body.option }],
          new: true
        }
      )
      .then(()=>{
        res.json({message:"poll updated"})
     })
})

module.exports = router

