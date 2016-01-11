var Plant = function(params){
  this.id = params._id;
  this.type = params.type;
  this.last_water = params.last_water;
  this.next_water = params.next_water;
}

Plant.fetch = function(){
  return $.getJSON("http://127.0.0.1:3000/plants")
    .then(function(plants){
      var plantsArray = [];
      plants.forEach(function(plant){
        plantsArray.push(new Plant(plant));
      })
      return plantsArray;
    })
    .fail(function(err){
      console.log("js failed")
    })
}

Plant.create = function(plantData){
  var self = this;
  console.log(plantData)
  var url = "http://127.0.0.1:3000/plants";
  return request = $.ajax({
    url: url,
    method: "post",
    data: JSON.stringify(plantData),
    contentType : 'application/json'
  }).then(function(plant) {
    var newP = new Plant(plant);
    return newP;
  });
}

Plant.prototype = {
  update: function(plantData){
    var url = "http://127.0.0.1:3000/plants/"+this.id;
    return $.ajax({
      url:url,
      method: "PUT",
      data: JSON.stringify(plantData),
      contentType : "application/json"
    }).then(function(newInfo){
      console.log(newInfo)
      console.log("this is new info")
      return newInfo;
    })
  },
  destroy: function() {
    console.log("destroy plant")
    var url = "http://127.0.0.1:3000/plants/" + this.id;
    var request = $.ajax( {url: url, method: "DELETE"} );
    return request;
  }
}
