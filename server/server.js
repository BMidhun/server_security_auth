// Setting Up DB and Server --------------------

const server = require('express')();
const mongoose = require('mongoose');
const body_parser = require ('body-parser');
const {User} = require('./models/users');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {authMiddleWare} = require('../server/middleware/auth');

server.use(body_parser.json())
server.use(cookieParser())

const dbServerUrl = "mongodb://localhost:3002/auth"
mongoose.connect(dbServerUrl,{ useNewUrlParser: true ,useUnifiedTopology: true }, (err) => {

        if(err)
            console.log('Connection Error !! Failed to connect to the DB...')
        
        else
                console.log('Connection to DB established....')
})



//--------------------------------------------------


server.post('/user',(req,res) => {

      const email = req.body.email;
      const password = req.body.password;

     const user = new User({
         email,
         password
     })

     user.save((err)=> {

            if(err){

                res.status(400).send(err);

            }
            else
                res.status(200).send('Data added to DB');
     })

})


server.post('/user/login', (req,res) => {

        User.findOne({email:req.body.email},(err,document) =>{


                if(!document) 
                    res.send('User not found..')
            
                document.comparePassword(req.body.password,(err,isMatch) => {

                    if(err)
                        throw err;
                    
                    if(!isMatch)
                        return res.status(404).send('Wrong password')
                    
                    document.generateToken((err,userRecord) => {
                        if(err) return res.status(400).send('Error in Authentication');
                        
                        res.cookie('auth_token',userRecord.token).send('User authorised here!!');

                    })

                })
                    

        })

})

server.get('/user/profile',authMiddleWare,(req,res) => {

            res.status(200).send(req.email);


})


const port = process.env.PORT || 3001;

server.listen(port, () => {

    console.log('Server running on port 3001.....')

})