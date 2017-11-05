
var projects =[];

//object constructor
var Project = function (projObj) {
  this.title = projObj.title;
  this.summary = projObj.summary;
  this.link = projObj.link;
  this.image = projObj.image;
  this.publishedOn = projObj.publishedOn;
  this.techUsed = projObj.techUsed;
}

//clone template and fill template
Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();

  $newProject.removeClass('template');

  $newProject.find("header h1 a").text(this.title).attr("href", this.link);
  $newProject.find(".projInfo time").text(this.publishedOn);
  $newProject.find(".tech").text($newProject.find(".tech").text()+this.techUsed);
  $newProject.find(".projSummary img").html(this.image);
  $newProject.find(".projSummary p").html(this.summary);

  // Display the date as a relative number of 'days ago'
  $newProject.find('.daysAgo').text('(' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago)');
  $newProject.append('<hr>');

  return $newProject;
}

//sort array of sample projects by date
sampleProjects.sort(function(a,b) {
return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

sampleProjects.forEach(function(projectObject) {
  projects.push(new Project(projectObject));
});

projects.forEach(function(projectSample) {
  $('#projSection').append(projectSample.toHtml());
});
