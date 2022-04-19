// we want to access data via our API
const axios = require('axios')

exports.homeRoute = (request,response)=>{
    // Make a get request to api/users
    axios.get(`http://localhost:${process.env.PORT}/api/users`)
    .then(function(resp){
        response.render('index',{user:resp.data})
    })  
    .catch(err => {
        response.send(err)
    })
}

exports.addUserRoute = (request,response)=>{
    response.render('add_user')
}

exports.updateUserRoute = (request,response)=>{
    // display current data in the form
    axios.get(`http://localhost:${process.env.PORT}/api/users`,
    {params:{id:request.query.id}})
    .then( userdata => {
        response.render('update_user',{user:userdata.data})
    }) 
    .catch(err=>response.send(err)) 
} 