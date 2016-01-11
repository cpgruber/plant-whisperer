var newPlantView = function(){
  this.$el = $(".newPlantView")
  $(".createPlant").on("click", function(event){
    event.preventDefault();
    var formData = {
      type: this.$el.find("input[name=type]").val(),
      freq: this.$el.find("input[name=freq]").val(),
      last_water: this.$el.find("input[name=last_water]").val(),
      outdoors: this.$el.find("input[name=outdoors]").is(":checked")
    }
    this.createPlant(formData)
  }.bind(this))
}

newPlantView.prototype = {
  createPlant: function(data){
    Plant.create(data).then(function(newPlant){
      this.$el.find("input").val("");
      this.$el.find("input[type=checkbox]").prop('checked', false);
      var newPlantView = new PlantView(newPlant)
      newPlantView.render();
    }.bind(this))
  }
}
