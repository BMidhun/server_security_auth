const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

     email:{
            
            type: String,
            required : true,
            trim : true,
            unique : true
     },

     password:{

        type:String,
        required:true,
        minlength:6

     },

     token : {

                type : String
     }

})

userSchema.pre('save', function(next) { 

        const user = this; // this refers to the user instance created in post request in server.js file

        if(user.isModified('password')) {

            const iterations = 10
            bcrypt.genSalt(iterations,(err,salt) => {
    
                    if(err) return next(err);
    
                    bcrypt.hash(user.password,salt,(err,hashedValue) => {
    
                            if(err) return next(err); // next is similar to next used when server uses middleware;
                            user.password = hashedValue;
                            next();
                    })
    
            })
    
        }
        else
            next();

})

userSchema.methods.comparePassword = function (input_password, callback){

        bcrypt.compare(input_password,this.password,(err,isMatch) => {

            if(err) callback(err);
            else
                callback(null,isMatch);

        })

}

userSchema.methods.generateToken = function(callback){

        const user = this;
        const server_secret_key = 'acbd213'

        const token = jwt.sign(user.email,server_secret_key);

        user.token = token

        user.save((err,userRecord) => {
                if(err)  callback(err);
                
                callback(null,userRecord);
        })


}

userSchema.statics.compareToken = function(tokenFromClient,callback){

        const user = this;
        const server_secret_key = 'acbd213'

        jwt.verify(tokenFromClient,server_secret_key,(error,decodedToken) => {

                // if(error)
                //         throw error;

                user.findOne({email:decodedToken, token:tokenFromClient},(err,userRecord) => {

                        if(err)
                                return callback(err);
                        
                        callback(null,userRecord);

                })

        })

}

const User = mongoose.model('User',userSchema)
 
module.exports = {

    User
}


/*

Schema.pre('[transactionType]',callback function)

this function is called before the execution of the transaction specified in the first parameter of pre



*/