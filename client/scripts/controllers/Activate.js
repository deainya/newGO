// Easy activatio controller
module.exports = function ($http, $rootScope, $scope, $state, $stateParams, auth, toastr) {

  $http.get(`/activate/${$stateParams.tp}`).then(function(res) {
    $scope.point = res.data;
  });

  $scope.Activate = function(credentials){
    var obj = credentials || {};

    console.log("point");
    console.log($scope.point);

    angular.extend(obj, {city: $scope.point.city, tradepoint: $scope.point, role: 1});

    console.log("obj");
    console.log(obj);

    auth.Register(obj,
      function(){
        $state.go('main');
      }, function(data){
        toastr.error('Что-то пошло не так...', 'Ой!');
      });
  };

};
