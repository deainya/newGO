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
    var city = $rootScope.cities[credentials.cityCode].name;
    credentials.city = city;
    if (credentials.wp) {
      var i = $scope.points.map(function(x) { return x.wp; }).indexOf(credentials.wp);
      credentials.point = {"wp":credentials.wp, "tradepoint":$scope.points[i].tradepoint, "address":$scope.points[i].address};
    }
    if (credentials.tp) {
      var j = $scope.tps.map(function(x) { return x.tp; }).indexOf(credentials.tp);
      credentials.point = {"tp":credentials.tp, "name":$scope.tps[j].name, "wp":$scope.tps[j].wp, "tradepoint":$scope.tps[j].tradepoint, "address":$scope.tps[j].address};
    }
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
