// services/Session.js
module.exports = function ($log, $rootScope, jwtHelper, localStorage) {
  // Init data when service is loaded
  var _user = JSON.parse(localStorage.getItem('session.user'));
  var _accessToken = localStorage.getItem('session.accessToken'); //JSON.parse()
  console.log(_user);
  console.log(_accessToken);
  if (_user) { console.log("User exists"); }
  if (_accessToken) { console.log("Token exists"); }
  if (_user && _accessToken) {
    console.log(jwtHelper.getTokenExpirationDate(_accessToken));
    if (!jwtHelper.isTokenExpired(_accessToken)) {
      $rootScope.user = _user;
      $rootScope.accessToken = _accessToken;
      console.log($rootScope.user);
    }
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
      this.setAccessToken("");
      console.log("Session destroy");
      console.log($rootScope.user);
    }
  }
};
