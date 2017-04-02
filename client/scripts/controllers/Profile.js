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
    var i = $scope.points.map(function(x) { return x.wp; }).IndexOf(credentials.wp);
    var j = $scope.tps.map(function(x) { return x.wp; }).IndexOf(credentials.tp);

    credentials.city = $rootScope.cities[credentials.cityCode].name;

    console.log(credentials.city);
    console.log($scope.points[i]);
    console.log($scope.tps[j]);

    /*auth.Register(credentials,
      function(){
        $state.go('profile');
      }, function(data){
        toastr.error('Что-то пошло не так...', 'Ой!');
      });*/
  };

  //$scope.setTradepoint = function(obj){
  //  $rootScope.user.tradepoint = obj;
  //  $state.reload();
  //};

  $scope.getTradepoint = function(city, role){
    $scope._tradepoint = false;
    if (city&&role) {
      $scope._tradepoint = true;
      dataSource.get('/tradepoint', {"city": $rootScope.cities[city].name, "role": role}).then(function(res) {
        $scope.points = res.data;
      });
    }
  };

  $scope.getTP = function(city, tp){
    $scope._tp = false;
    if (tp) {
      $scope._tp = true;
      dataSource.get('/tradepoint/tp', {"city": $rootScope.cities[city].name, "tp": tp}).then(function(res) {
        $scope.tps = res.data;
      });
    }
  };

  if (auth.isLoggedIn()) {
    $scope.gravatarUrl = Gravatar.generate($rootScope.user.email, 80);
  }
};
