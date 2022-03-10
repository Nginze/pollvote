const {Router} = require('express')
const router = Router()
const Poll = require('../models/PollModel.js')
const User = require('../models/userModel')

const signVote = (req, res, next) => {
    if(req.user){
        User.updateOne(
            {_id: req.user._id},
            {$inc: {
                "votes":1
              }
            },
        ).then((res)=> {})
    }
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
    
    Poll.find({visibility:"Public"}).then(users => {res.json(users)})
    
})
router.get('/public/:id',hasVoted, (req, res) =>{
    Poll.findOne({_id:req.params.id})
        .then(poll => {res.json({poll,hasVoted:req.hasVoted})})
    
})

router.post('/public', (req, res) =>{
   
    const newPoll = new Poll({
        user_id: req.body.user_id,
        user:req.body.user,
        question: req.body.question,
        options: [{title:req.body.option1}, {title:req.body.option2}],
        category: req.body.category,
        visibility: req.body.visibility
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

router.get('/user/:id', (req, res) => {
    Poll.find({user_id: req.params.id})
        .then((users)=>{res.json(users)})
})
module.exports = router

