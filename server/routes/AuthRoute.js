const {Router} = require('express')
const router = Router()
const passport = require('passport')
require('dotenv').config()

router.get('/google', passport.authenticate('google', {scope: ['profile']}))

router.get('/google/callback', passport.authenticate('google', {

    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failure'
}))

router.get('login/failure',(req,res) =>{

    res.status(401).json({
        isAuth:req.isAuthenticated(),
        message:"Failure in authenitcation"
    })

})






module.exports = router
