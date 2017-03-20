// Easy activatio controller
module.exports = function ($http, $rootScope, $scope, $state, $stateParams, auth, toastr) {

  $http.get(`/activate/${$stateParams.tp}`).then(function(res) {
    $scope.point = res.data;
  });;


};
