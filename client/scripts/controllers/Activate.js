// Easy activatio controller
module.exports = function ($http, $rootScope, $scope, $state, $stateParams, auth, toastr) {

  $http.get(`/activate/${$stateParams.tp}`).then(function(res) {
    $scope.point = res.data;
    console.log($scope.point);
  });

  $scope.Activate = function(credentials){
    console.log($scope.point);

    angular.extend(credentials, {city: $scope.point.city});
    angular.extend(credentials, {tradepoint: $scope.point});
    angular.extend(credentials, {role: 1}); // партнёр

    console.log(credentials);

    auth.Register(credentials,
      function(){
        $state.go('main');
      }, function(data){
        toastr.error('Что-то пошло не так...', 'Ой!');
      });
  };

};
