const bcrypt = require('bcryptjs')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECERT, REFRESH_TOKEN_SECERT, NODE_ENV } = require('../config')

//register
exports.register = async (req,res)=>
{
const {username,password,role} = req.body

const hash = await bcrypt.hash(password,10)

const user = new User({
username,
password:hash,
role:role||'user',
})

await user.save();

res.json({message:"User is registered!"});
}

//login
exports.login = async (req,res)=>
{
   const {username,password} = req.body

   const user = await User.findOne({username});

   if(!user) return res.status(401).json({message:'Invalid credentials'});

   const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch) return res.status(401).json({message:"invalid credentials"});

   const payload = {
    userId: user._id,
    username: user.username,
    role:user.role
   }

   const accessToken = jwt.sign(payload,ACCESS_TOKEN_SECERT,{expiresIn:'15m'});

   const refreshToken = jwt.sign(payload,REFRESH_TOKEN_SECERT,{expiresIn:'7d'});

   user.refreshToken = refreshToken;

   await user.save();

   res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    sameSite:'strict',
    secure:NODE_ENV === 'production',
    maxAge : 7*24*60*60*1000
   });

   res.json({accessToken})

}


//refresh
exports.refresh = async(req,res) =>
{
    const token = req.cookies.refreshToken;
    
    if(!token) return res.sendStatus(401);

    const user = await User.findOne({refreshToken:token});

    if(!user) return res.sendStatus(403);

    jwt.verify(token,REFRESH_TOKEN_SECERT,(err,decoded)=>
    {
        if(err) return res.sendStatus(403);

        const payload = {userId:decoded.userId,username:decoded.username,role:decoded.role};

        const accessToken = jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:'15m'});

        res.json({accessToken});
    })

}

// logout function
exports.logout = async(req,res) =>
{
    const token = req.cookies.refreshToken;

    const user = await User.findOne({refreshToken:token})

    if(user)
    {
        user.refreshToken = '',
        await user.save()
    }

    res.clearCookie('refreshToken');
    res.sendStatus(204)
}



