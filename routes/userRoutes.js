const express = require('express')
const { protect, authorizeAdmin } = require('../middleware/authMiddleware')
const router = express.Router()



router.get('/profile',protect,(req,res)=>
 {res.json({message:'Your Profile',user:req.user})}
)

router.get('admin/user',protect,authorizeAdmin,async (req,res)=>
{
    const count = await User.countDocuments();

    res.json({totalUsers:count});
})


module.exports = router




