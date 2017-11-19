'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var projectView = {};


//function to remove duplicates from an Array, will be called in populateFilters below.
//pulled from stackexchange: https://codereview.stackexchange.com/questions/60128/removing-duplicates-from-an-array-quickly
Array.prototype.unique = function() {
  return this.reduce(function(accum, current) {
    if (accum.indexOf(current) < 0) {
      accum.push(current);
    }
    return accum;
  }, []);
}

projectView.populateFilters= function () {
  let allTechUsed = [];
  Project.all.forEach(function(entireProject) {
    allTechUsed = allTechUsed.concat(entireProject.getTechnologies());
  })
  allTechUsed=allTechUsed.unique();

  allTechUsed.forEach(function(addTech) {

    let optionTag =`<option value ="${addTech}">${addTech}</option>`;
    $('#tech-filter').append(optionTag);
  })
}

projectView.handleTechFilter = function () {
  $('#tech-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      // console.log($this).val());
      $(`article[data-category*="${$(this).val()}"]`).fadeIn(1000);
    } else {
      $('article').show();
    }
  })
}

projectView.handleMainNav = function() {

  $(".tab").on("click", function() {
    var clickedNavItem = $(this).data("content");
    $(".tab-content").hide();
    $('#' + clickedNavItem).show();
  })

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

projectView.setTeasers = function() {
  $('.projSummary *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.

  $('.read-on').on('click', function(event){
    console.log($(this).text());
    if ($(this).text().indexOf("More")>= 0) {
      $(this).prev().find("*:nth-of-type(n+2)").show();
      $(this).html("Less &rarr;");
    } else {
      $(this).prev().find("*:nth-of-type(n+2)").hide();
      $(this).html("More &rarr;");
    }
    event.preventDefault();

  })
}

projectView.initIndexPage = function() {
  console.log("start init index page");
  Project.all.forEach(function(project) {
    $("#projectsContainer").append(project.toHtml())
  });
  projectView.setTeasers();
  projectView.populateFilters();
  projectView.handleTechFilter();
  projectView.handleMainNav();
};
