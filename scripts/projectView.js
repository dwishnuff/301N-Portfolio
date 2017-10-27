'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var projectView = {};

// projectView.populateFilters = function() {
//   $('article').each(function() {
//     var authorName, category, optionTag;
//     if (!$(this).hasClass('template')) {
//       // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
//       //       To do so, Build an `option` DOM element that we can append to the author select box.
//       //       Start by grabbing the author's name from an attribute in `this` article element,
//       //       and then use that bit of text to create the option tag (in a variable named `optionTag`),
//       //       that we can append to the #author-filter select element.
//       authorName = $(this).attr('data-author');
//       optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
//
//       if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
//         $('#author-filter').append(optionTag);
//       }
//
//       // REVIEW: Similar to the above, but...
//       //       Avoid duplicates! We don't want to append the category name if the select
//       //       already has this category as an option!
//       category = $(this).attr('data-category');
//       optionTag = '<option value="' + category + '">' + category + '</option>';
//       if ($('#category-filter option[value="' + category + '"]').length === 0) {
//         $('#category-filter').append(optionTag);
//       }
//     }
//   });
// };
//
// projectView.handleAuthorFilter = function() {
//   $('#author-filter').on('change', function() {
//     // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
//     //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
//     //         onto it.
//     if ($(this).val()) {
//       $('.article-body').hide();
//       console.log($(this).val());
//       $('article[data-author="' + $(this).val() +'"] .article-body').fadeIn(1000);
//       // TODO: If the select box was changed to an option that has a value, we need to hide all the articles,
//       //       and then show just the ones that match for the author that was selected.
//       //       Use an "attribute selector" to find those articles, and fade them in for the reader.
//
//     } else {
//       $('.article-body').show();
//       // TODO: If the select box was changed to an option that is blank, we should
//       //       show all the articles, except the one article we are using as a template.
//
//     }
//     $('#category-filter').val('');
//   });
// };
//
// projectView.handleCategoryFilter = function() {
//   // TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element.
//   //       When an option with a value is selected, hide all the articles, then reveal the matches.
//   //       When the blank (default) option is selected, show all the articles, except for the template.
//   //       Be sure to reset the #author-filter while you are at it!
//   $('#category-filter').on('change', function() {
//     if ($(this).val()) {
//       $(".article-body").hide();
//       $('article[data-category="' + $(this).val() +'"] .article-body').show();
//     } else {
//       $(".article-body").show();
//     }
//     $('#author-filter').val('');
//   })
// };

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

$(document).ready(function() {
  projectView.setTeasers();
  // articleView.populateFilters();
  // articleView.handleAuthorFilter();
  // articleView.handleCategoryFilter();
  projectView.handleMainNav();
})
