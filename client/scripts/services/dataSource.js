// services/dataSource.js
module.exports = function ($http, session) {
  return {
    get: function(url, p){
      p = p || {};
      $http.defaults.headers.common['x-access-token'] = session.getAccessToken();
      return $http.get(url, {params: p});
    },
    set: function(url, d){
      $http.defaults.headers.common['x-access-token'] = session.getAccessToken();
      return $http({method: 'POST', url: url, data: {d}});
    }
  }
};

// REFACTOR THE CODE
// Rewritable with $resource injection instead fo $http
/*module.exports = function ($resource) {
  return $resource(url+'/:id', {id: '@id'})
};*/
