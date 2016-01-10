var Plant = function(params){
  this.id = params._id;
  this.type = params.type;
  this.last_water = params.last_water;
  this.next_water = params.next_water;
}
Plant.all = [];
Plant.fetch = function(){
  return $.getJSON("http://127.0.0.1:3000/plants")
    .then(function(plants){
      plants.forEach(function(plant){
        Plant.all.push(new Plant(plant));
      })
    })
    .fail(function(err){
      console.log("js failed")
    })
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
      console.log("this is new info")
    })
  },
  destroy: function() {
    console.log("destroy plant")
    var url = "http://127.0.0.1:3000/plants/" + this.id;
    var request = $.ajax( {url: url, method: "DELETE"} );
    return request;
  }
}

// Artist.prototype = {
//   fetchSongs: function(){
//     var artist = this;
//     var url = "http://localhost:3000/artists/" + artist.id + "/songs";
//     artist.songs = [];
//     var request = $.getJSON(url).then(function(response){
//       for(var i = 0; i < response.length; i++){
//         artist.songs.push(new Song(response[i]));
//       }
//     }).fail(function(repsonse){
//       console.log("js failed to load");
//     });
//     return request;
//   },
//   update: function(artistData) {
//     var self = this;
//     var url = "http://localhost:3000/artists/" + self.id;
//     var request = $.ajax({
//       url: url,
//       method: "patch",
//       data: JSON.stringify(artistData),
//       contentType : 'application/json'
//     }).then(
//       function(updatedArtistInfo) {self.reload(updatedArtistInfo);}
//     );
//     return request;
//   },
//   destroy: function() {
//     var url = "http://localhost:3000/artists/" + this.id;
//     var request = $.ajax( {url: url, method: "delete"} );
//     return request;
//   },
//   reload: function(newData){
//     for(var attrname in newData) {
//       this[attrname] = newData[attrname];
//     }
//   }
// };
