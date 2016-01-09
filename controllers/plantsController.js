var plantsController = {
  read:function(req,res){
    console.log(req.user);
    res.json(req.user)
  }
}

module.exports = plantsController;
