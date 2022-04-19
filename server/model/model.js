// CREATING A MONGOdb SCHEME
// allows you to define shape and content of the 
// document
const mongoose = require('mongoose')
// you can also call this a simple MongoDB model
let schemea = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

const Userdb = mongoose.model("userdb",schemea)
module.exports = Userdb