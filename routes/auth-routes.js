const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render('login')
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
//sending request for google authenticaion
router.get('/google',passport.authenticate('google', {scope:['profile']}),(req,res)=>{
    
});

//callback after giving access any email address
router.get('/google/cb',passport.authenticate('google'),function(req,res){
    //console.log(req)
    //res.send(req.user)
    res.redirect('/profile');
})


module.exports = router