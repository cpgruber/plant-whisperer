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
    res.render('index')
  }
}

module.exports = usersController;
