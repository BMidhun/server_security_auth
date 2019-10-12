const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const password = 'password';
const saltRound = 'sdasd';


// function hashPassword(){

// bcrypt.hash('password',saltRound,(error,hashedValue) => {

//         if(error){

//                 console.log('Error!!')
//                 return next(error)
//         }

//         else
//             console.log('Hashed Value:',hashedValue);

// })

// }

// hashPassword();

// JSON WEB TOKEN

const user = {

        email : 'midhun123@gmail.com',
        password : 'xyz123'
}

const server_secret_key = 'abcd123';

const generatedToken = jwt.sign(user,server_secret_key);

console.log("Generated Token:",generatedToken);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. -- email
//eyJlbWFpbCI6Im1pZGh1bjEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6Inh5ejEyMyIsImlhdCI6MTU3MDY0MzcyOX0. -- password
//UwFYzvesgY4ovZ51HTbd1QdonhwprSbN52-OVIzhCvo -- verification-code

const recievedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZGh1bjEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6Inh5ejEyMyIsImlhdCI6MTU3MDY0MzcyOX0.UwFYzvesgY4ovZ51HTbd1QdonhwprSbN52-OVIzhCvo'

const decodedToken = jwt.verify(recievedToken,server_secret_key);

console.log("Decoded Token:",decodedToken);