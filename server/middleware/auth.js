const {User} = require('../models/users');

function authMiddleWare(req,res,next) {

    const tokenFromClient = req.cookies.auth_token;

    User.compareToken(tokenFromClient,(err,user)=>{

        if(err)
            console.log('Error Message');
        
        if(!user)
            res.status(401).send('No Access');
        
            req.email = user.email  
            
        next();

})

}


module.exports = {authMiddleWare}