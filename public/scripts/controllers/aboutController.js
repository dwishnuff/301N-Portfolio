'use strict';

(function(module) {
  const aboutController = {};

    aboutController.index = function() {
      $('.tab-content').hide();
      $('#about').show();
    };


  module.aboutController = aboutController;
})(window);
