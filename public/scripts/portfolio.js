//object constructor
// var Project = function (projObj) {
//   this.title = projObj.title;
//   this.summary = projObj.summary;
//   this.link = projObj.link;
//   this.image = projObj.image;
//   this.publishedOn = projObj.publishedOn;
//   this.techUsed = projObj.techUsed;
//   this.overlay = projObj.overlay;
// }

function Project (projObj) {
  Object.keys(projObj).forEach(function(key) {
    this[key] = projObj[key];
  }, this);
}

Project.all =[];

Project.prototype.getTechnologies = function () {
  return this.techUsed.split(", ");
}

//clone template and fill template
Project.prototype.toHtml = function() {
  //handlebars template:
  const templateFiller = Handlebars.compile($('#projects-template').html());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus =  ` (${this.daysAgo} days ago)`;


  return templateFiller(this);

}

Project.loadAll = function (sampleProjects) {
  //sort array of sample projects by date
  sampleProjects.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  sampleProjects.forEach(function(projectObject) {
    Project.all.push(new Project(projectObject));
  });


}

Project.fetchAll = function(callback) {
  // if (localStorage.sampleProjects) {
  //   console.log("localStorage exists");
  //   Project.loadAll(JSON.parse(localStorage.sampleProjects));
  //   projectView.initIndexPage();
  // } else {
  //   console.log("localStorage doesn't exist");
  //   $.getJSON("/data/projects.json", function(data) {
  //     console.log(data);
  //     localStorage.setItem ('sampleProjects', JSON.stringify(data));
  //     Project.loadAll(data);
  //     projectView.initIndexPage();
  //   }).fail(function(error) {
  //     console.log ("error");
  //     console.log(JSON.parse(error.responseText));
  //   })
  //
  // }
  $.get('/projects')
  .then(
    function(results) {
      Project.loadAll(results);
      callback();
    }
  )
}
