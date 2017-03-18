// services/Auth.js
module.exports = function ($http, session) {
  return {
    isLoggedIn: function(){
      return session.getUser() !== undefined;
    },
    Register: function(credentials, callback){
      return $http
        .post('/api/register', credentials)
        .then(function(response){
          var data = response.data;
          session.setUser(data.user);
          session.setAccessToken(data.token);
          console.log(data.user);
          console.log(data.token);
          callback();
        });
    },
    logIn: function(credentials, callback, error){
      return $http
        .post('/api/login', credentials)
        .then(function(response){
          var data = response.data;
          session.setUser(data.user);
          session.setAccessToken(data.token);
          console.log(data.user);
          console.log(data.token);
          callback();
        },function(response){
          var data = response.data;
          error(data);
        });
    },
    logOut: function(){
      return $http
        .get('/api/logout')
        .then(function(response){
          session.destroy();
        });
    }
  }
};
