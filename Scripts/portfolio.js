
var projects =[];

//object constructor
var Project = function (projObj) {
  this.title = projObj.title;
  this.summary = projObj.summary;
  this.link = projObj.link;
  this.image = projObj.image;
  this.publishedOn = projObj.publishedOn;
  this.techUsed = projObj.techUsed;
  this.overlay = projObj.overlay;
}

Project.prototype.getTechnologies = function () {
  return this.techUsed.split(", ");
}

//clone template and fill template
Project.prototype.toHtml = function() {

  //handlebars template:
  var templateFiller = Handlebars.compile($('#projects-template').html());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus =  ` (${this.daysAgo} days ago)`;

  var filledTemplate =templateFiller (this);
  return filledTemplate;

}

//sort array of sample projects by date
sampleProjects.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

sampleProjects.forEach(function(projectObject) {
  projects.push(new Project(projectObject));
});

projects.forEach(function(projectSample) {
  $('#projectsContainer').append(projectSample.toHtml());
});
