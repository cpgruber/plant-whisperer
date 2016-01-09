var usersController = {
  login: function(req,res){
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
