var PlantView = function(plant){
  this.plant = plant;
  this.$el = $("<div class='plant' />")
}

PlantView.prototype = {
  render: function(){
    this.$el.append("<p>"+this.plant.type+"</p><button class='edit'>Edit</button>");
    $(".plants").append(this.$el)
    var btn = this.$el.find(".edit").on("click", function(){
      console.log("render edit form")
      this.$el.html(this.renderEditForm())
    }.bind(this))
    var submit = this.$el.find(".edit-submit").on("click",function(){
      console.log("form button click")
      this.update()
    }.bind(this))
  },
  update: function(){
    var self = this;
    var url = "http://127.0.0.1:3000/plants/" + this.id;
    var data = {type:$("input[name=type]").val()};
    this.plant.update(data).then(function(){self.render()})
  },
  renderEditForm: function() {
    this.$el.html(this.plantEditTemplate(this.plant));

    this.$el.find(".updatePlant").on("click", function() {
      this.update();
    }.bind(this));

    this.$el.find(".deletePlant").on("click", function() {
      console.log("destroy")
      this.plant.destroy().then(function() { this.$el.fadeOut()});
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
    return(html);
  }
}
