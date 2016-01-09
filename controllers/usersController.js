var usersController = {
  login: function(req,res){
    // console.log(req.user);
    // if (req.session.passport){
    //   req.logout();
    //   req.session.destroy();
    // }
    // console.log("*************")
    // console.log(req.session)
    // req.logout();
    // req.session.destroy();
    res.render("login");
  },
  logout: function(req,res){
    req.logout();
    req.session.destroy();
    res.redirect("/login");
  },
  index: function(req,res){
    // console.log("***** The current user is "+res.locals.currentUser)
    res.render('index')
  }
}

module.exports = usersController;
