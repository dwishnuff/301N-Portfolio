



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

Project.all =[];

Project.prototype.getTechnologies = function () {
  return this.techUsed.split(", ");
}

//clone template and fill template
Project.prototype.toHtml = function() {
  // var $newProject = $('article.template').clone();
  //handlebars template:
  const templateFiller = Handlebars.compile($('#projects-template').html());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus =  ` (${this.daysAgo} days ago)`;


  return templateFiller(this);
  // $newProject.removeClass('template');
  //
  // $newProject.attr('data-category', this.techUsed);
  //
  // $newProject.find("header h1 a").text(this.title).attr("href", this.link);
  // $newProject.find(".projInfo time").text(this.publishedOn);
  // $newProject.find(".tech").text($newProject.find(".tech").text()+this.techUsed);
  // $newProject.find(".projSummary img").html(this.image);
  // $newProject.find(".projSummary p").html(this.summary);
  //
  // // Display the date as a relative number of 'days ago'
  // $newProject.find('.daysAgo').text('(' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago)');
  // $newProject.append('<hr>');
  //
  // return $newProject;
}

Project.loadAll = function (sampleProjects) {
  //sort array of sample projects by date
  sampleProjects.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  sampleProjects.forEach(function(projectObject) {
    Project.all.push(new Project(projectObject));
  });

  // Project.all.forEach(function(projectSample) {
  //   $('#projSection').append(projectSample.toHtml());
  // })
}

Project.fetchAll = function() {
  if (localStorage.sampleProjects) {
    console.log("localStorage exists");
    Project.loadAll(JSON.parse(localStorage.sampleProjects));
    projectView.initIndexPage();
  } else {
    console.log("localStorage doesn't exist");
    $.getJSON("/data/projects.json", function(data) {
      console.log(data);
      localStorage.setItem ('sampleProjects', JSON.stringify(data));
      Project.loadAll(data);
      projectView.initIndexPage();
    }).fail(function(error) {
      console.log ("error");
      console.log(JSON.parse(error.responseText));
    })

  }
}
