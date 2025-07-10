const { ACCESS_TOKEN_SECERT } = require("../config");


exports.protect = async (req,res,next) =>
{
  const authHeader = req.header['authorization'];
  const token = authHeader?.split(' ')[1];

  if(!token) return res.sendStatus(401);

  jwt.verify(token,ACCESS_TOKEN_SECERT,(err,decoded)=>
  {
    if(err) return res.sendStatus(403)
    req.user = decoded;
    next()
  })
}

exports.authorizeAdmin = (req,res,next)=>
{
if(req.user.role !== 'admin') return res.sendStatus(403);
next()
}