const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')

// encapsulating the PORT value
// in an .env file
dotenv.config( {path:'config.env'} )
const PORT = process.env.PORT || 8080

const app = express() 
 
// logger using morgan module
app.use(morgan('tiny')) 

//mongoDB connection
connectDB()

//body parser
app.use(bodyparser.urlencoded({extended:true}))
 

//setting up EJS
app.set("view engine","ejs")
// if EJS files are not in the view folder
// in the root directory, we need to specify the
// location to express as below
//app.set("views",path.join(__dirname,"<folder_name_with_path>"))


// Asset folder contains all client side files
//loading asset using middleware
app.use('/css',express.static(
    path.join(__dirname,"assets","css")
))
app.use('/img',express.static(
    path.join(__dirname,"assets","img")
))
app.use('/js',express.static(
    path.join(__dirname,"assets","js")
))
// to access the files, justgive virtual path
// css/style.css


//Creating Views
    //create "index.ejs" in views folder
    //create html code.
 


//routes
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`Listening at PORT : ${PORT}`);
})