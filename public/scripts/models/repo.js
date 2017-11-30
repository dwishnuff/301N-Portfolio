'use strict';

(function(module) {
  const repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {

          $.ajax(`https://api.github.com/user/repos?access_token=${token}`)

        .then(
          results => {
            repos.all = results;
            callback();
          }
        );



  };

  
  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(window);
