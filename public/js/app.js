$(document).ready(function(){
  Plant.fetch().then(function(plants){
    Plant.all.forEach(function(plant){
      var plantView = new PlantView(plant);
      plantView.render();
    })
  })
});
