// User profile controller
module.exports = function ($rootScope, $scope, $state, auth, dataSource, Gravatar, toastr) {
  $scope.Login = function(credentials){
    auth.logIn(credentials,
      function(){
        if ($rootScope.user.role == 1) { $state.go('main'); } else { $state.go('profile'); }
      }, function(data){
        toastr.error('Указан неверный логин или пароль', 'Ой!');
      });
  };

  $scope.Register = function(credentials){
    auth.Register(credentials,
      function(){
        $state.go('profile');
      }, function(data){
        toastr.error('Что-то пошло не так...', 'Ой!');
      });
  };

  //$scope.setTradepoint = function(obj){
  //  $rootScope.user.tradepoint = obj;
  //  $state.reload();
  //};

  $scope.getTradepoints = function(c, r){
    $scope.points = [];
    $scope._tradepoints = false;
    if (c&&r) {
      $scope._tradepoints = true;
      dataSource.get('/tradepoints', {city: $rootScope.cities[c].name, role: r}).then(function(res) {
        $scope.points = res.data;
      });
    }
  };

  if (auth.isLoggedIn()) {
    $scope.gravatarUrl = Gravatar.generate($rootScope.user.email, 80);
  }
};
