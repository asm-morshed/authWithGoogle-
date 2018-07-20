const router = require('express').Router();
const passport = require('passport');

router.get('/login/google',(req,res)=>{
    res.render('logingoogle')
});
router.get('/login/github',(req,res)=>{
    res.render('logingithub')
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
//sending request for google authenticaion
router.get('/google',passport.authenticate('google', {scope:['profile']}),(req,res)=>{
    
});

router.get('/github',passport.authenticate('github'),function(req,res){
    console.log("Clicked")
});


//callback after giving access any email address
router.get('/google/cb',passport.authenticate('google'),function(req,res){
    console.log(req)
    //res.send(req.user)
    res.redirect('/profile');
})
router.get('/github/callback',  passport.authenticate('github'),  function(req, res) {
    // Successful authentication, redirect home.
    console.log("After callback")
   res.redirect('/profile');
  });


module.exports = router