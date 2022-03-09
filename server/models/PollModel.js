const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PollSchema = new Schema({

    question:{
        type: String, 
        required: true, 

    },
    options:[{
        title:{
            type: String, 
            required: true
        },
        selections:{
            type:Number,
            required: false,
            default:0
        }

    }],
    votes:{
        type:Number,
        required: false,
        default: 0
    },
    date:{
        type:Date,
        default:Date.now
    }
})

var Poll = mongoose.model("Polls", PollSchema)

module.exports = Poll