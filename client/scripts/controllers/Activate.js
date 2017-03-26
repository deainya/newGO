// Easy activatio controller
module.exports = function ($http, $rootScope, $scope, $state, $stateParams, auth, toastr) {
  $http.get(`/activate/${$stateParams.tp}`).then(function(res) {
    $scope.point = res.data;
  });

  $scope.Activate = function(credentials){
    angular.extend(credentials, {city: $scope.point[0].city, tradepoint: $scope.point[0], role: 1});
    auth.Register(credentials,
      function(){
        $state.go('main');
      }, function(data){
        toastr.error('Что-то пошло не так...', 'Ой!');
      });
  };

};
