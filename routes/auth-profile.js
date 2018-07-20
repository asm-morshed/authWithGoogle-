const router = require('express').Router();

function authCheck(req,res,next){
    console.log("authCheck method google: "+req);
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
}

router.get('/',authCheck,(req,res)=>{
    console.log("authCheck method redirecting profile: "+req.user);
    //res.send('your profile page')

    res.render('profile',{user: req.user});
})

module.exports = router;