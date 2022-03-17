const jwt = require('jsonwebtoken')
function verifyToken(req,res,next)
{
    const header = req.headers['authorization'];
    if(!header)
    {
        res.send("authorization header missing needed")
    }
    const token =  header.split(' ')[1]
    

    if(token===null)
    {
            res.status(403).send("Access Denied")
    }
    else
    {
            jwt.verify(token,'amitp',(err,token)=>{
                if(err)
                {
                    res.send("Authentication failed or token expired");
                }
                else
                {
                    //console.log(token)
                    req.token = token
                    next();
                }
            })
    }
}

module.exports=verifyToken;