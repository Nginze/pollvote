const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId:{
      type: Number, 
      required: true
    },
    username: {
       type: String,
       required:true
    },
    image:{
      type:String,
    },
    votes:{
      type:Number,
    }

  }, {timestamps: true});
  
var User = mongoose.model("GoogleUsers", UserSchema)

module.exports = User
