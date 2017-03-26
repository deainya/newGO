// services/Session.js
module.exports = function ($log, $rootScope, jwtHelper, localStorage) {
  // Init data when service is loaded
  var _user = JSON.parse(localStorage.getItem('session.user'));
  var _accessToken = localStorage.getItem('session.accessToken');
  console.log(_user + " " + _accessToken);
  if (_user && _accessToken) {
    console.log(jwtHelper.getTokenExpirationDate(_accessToken));

    $rootScope.user = _user;
    $rootScope.user = _accessToken;

    console.log($rootScope.user.role + " " + $rootScope.user.city);
  }

  return {
    getUser: function(){
      return $rootScope.user;
    },
    setUser: function(user){
      $rootScope.user = user;
      localStorage.setItem('session.user', JSON.stringify(user));
      return $rootScope.user;
    },
    getAccessToken: function(){
      return $rootScope.accessToken;
    },
    setAccessToken: function(token){
      $rootScope.accessToken = token;
      localStorage.setItem('session.accessToken', token);
      return $rootScope.accessToken;
    },
    destroy: function(){
      this.setUser(null);
      this.setAccessToken(null);
      console.log("Session destroy");
    }
  }
};
