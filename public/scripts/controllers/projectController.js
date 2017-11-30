(function(module) {
  const projectController = {};
  projectController.index = function () {
    projectView.initIndexPage();

      $('.tab-content').hide();
      $('#projSection').show();

  };

  module.projectController = projectController;
})(window);
