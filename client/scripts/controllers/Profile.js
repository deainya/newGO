// User profile controller
module.exports = function ($rootScope, $scope, $state, auth, dataSource, Gravatar, toastr) {

  $scope.Login = function(credentials){
    auth.logIn(credentials,
      function(){
        $state.go('profile');
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

  if(auth.isLoggedIn()){
    $scope.gravatarUrl = Gravatar.generate($rootScope.user.email, 80);
  }
};
