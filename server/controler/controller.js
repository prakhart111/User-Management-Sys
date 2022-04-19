// after creating a mongoose model
// we create a controller file

//using controller
//we can make SELECT UPDATE DELETE and CreateRecords
//in the DB

const Userdb = require('../model/model')
const model = require('../model/model')

//our first API

// creating and saving new user
exports.create = (req,resp)=>{
    //validating the request
    if(!req.body){
        resp.status(400).send({message:"Cannot be empty"})
        return
    }

    //New User
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
 
    //saving user in DB
    //calling different methods using chaining 
    user
        .save(user)
        .then(data=>{
            //resp.send(data)
            resp.redirect('/add-user')
        })
        .catch(err => resp.status(500).send({
            message:"err.message" || "Some error occured while creating a Create Op"
        }) )
}

//retrieve and return all users
//OR
//retrieve and return single
exports.find = (req,resp)=>{
    // we are using this for getting both all users and Single user
    // we will use Query Parameters over here
    if(req.query.id){
        //when query is present, provide that data
        const id = req.query.id
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                resp.status(404)
                .send({message:`User not found with ID : ${id}`})
            }else{
                resp.send(data)
            }
        })
        .catch(err=>{
            resp.status(500)
            .send({message:`Error retrieving with ID : ${id}`})
        })
    }
    else{
        //when query not present, return all data
        Userdb.find()
        .then(user=>{
            resp.send(user)
        })
        .catch(err=>{
            resp.status(500).send({
                message:err.message || "Error occured while finding user"
            })
        })
    }
}

//Update a new Identified user by user.id
exports.update = (req,resp)=>{
    if(!req.body){
        return resp.status(400)
        .send({ message:"Empty data"})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
    .then(data => {
        if(!data){
            resp.status(404).send({
                message:`Can't Update ${id} Maybe user not found`
            })
        }else{
            resp.send(data)
        } 
    })
    .catch(err => {
        resp.status(500).send({
            message:"Error in updating"
        })
    })
}

// Delete he user with specified user ID
exports.delete = (req,resp)=>{
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            resp.status(404)
            .send({message:`Cannot delete with ID ${id}`})
        }else{
            resp.send({
                message:"User Deleted Succesfully"
            })
        }
    })
    .catch(err => {
        resp.status(500).send({
            message:`Cannot delete ${id}`
        })
    })
}