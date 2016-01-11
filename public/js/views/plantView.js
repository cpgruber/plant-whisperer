var PlantView = function(plant){
  this.plant = plant;
  this.$el = $("<div class='plant' />")
  $(".plants").append(this.$el)
}

PlantView.prototype = {
  render: function(){
    this.$el.html("<p>"+this.plant.type+"</p><button class='edit'>Edit</button>");
    var btn = this.$el.find(".edit").on("click", function(){
      this.$el.html(this.renderEditForm())
    }.bind(this))
    var submit = this.$el.find(".edit-submit").on("click",function(){
      this.update()
    }.bind(this))
  },
  update: function(){
    var self = this;
    var url = "http://127.0.0.1:3000/plants/" + this.id;
    var data = {type:$("input[name=type]").val()};
    this.plant.update(data).then(function(plant){
      self.plant = plant;
      self.render();
    })
  },
  renderEditForm: function() {
    this.$el.html(this.plantEditTemplate(this.plant));
    this.$el.find(".updatePlant").on("click", function() {
      this.update();
    }.bind(this));
    this.$el.find(".deletePlant").on("click", function() {
      this.plant.destroy().then(function() {
        this.$el.fadeOut()}.bind(this));
    }.bind(this));
    this.$el.find(".cancelEdit").on("click", function() {
      this.render();
    }.bind(this));
  },
  plantTemplate: function(){
    var plant = this.plant;
    var html = $("<div>");
    html.append("<h3>" + plant.type + "</h3>");
    html.append("<button class='editPlant'>Edit Artist</button>");
    return(html);
  },
  plantEditTemplate: function() {
    var plant = this.plant;
    var html = $("<div>");
    html.append("<input name='type' value='" + plant.type + "'>");
    html.append("<button class='updatePlant'>Update Plant</button>");
    html.append("<button class='deletePlant'>Delete Plant</button>");
    html.append("<button class='cancelEdit'>Cancel</button>");
    return(html);
  }
}
