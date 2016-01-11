$(document).ready(function(){
  Plant.fetch().then(function(plants){
    plants.forEach(function(plant){
      var plantView = new PlantView(plant);
      plantView.render();
    })
    new newPlantView();
  })
});
