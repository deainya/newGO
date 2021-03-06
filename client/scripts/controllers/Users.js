// Users controller
module.exports = function ($rootScope, $scope, $state, dataSource) {
  dataSource.get('/users', {}).then(function(res) {
    $scope.users = res.data;
  });
/*
  $scope.SendLetter = function(email, message){
    dataSource.set('/api/user/letter', {email: email, letter: message}).then(function(res){
      if (res.data.success) {
        $scope.u.sent = true;
        //$state.reload();
      }
    });
  };

  $scope.setRole = function(email, role){
    dataSource.set('/api/user/role', {email: email, role: role}).then(function(res){
      if (res.data.success) {
        $state.reload();
      }
    });
  };
*/
  $scope.DeleteUser = function(email){
    dataSource.set('/api/user/delete', {email: email}).then(function(res){
      if (res.data.success) {
        $state.reload();
      }
    });
  };
};
