import angular from 'angular'
import 'angular-resource'
import 'angular-toastr'
import 'angular-ui-router'
import 'angular-ui-mask'

var Auth = require('./services/Auth');
var Session = require('./services/Session');
var dataSourceService = require('./services/dataSource');
var GravatarFactory = require('./services/Gravatar');
var localStorageFactory = require('./services/localStorage');

var profileCtrl = require('./controllers/Profile');

angular
.module('rfbGO', ["ngResource", "toastr", "ui.router", "ui.mask"])
.config(($locationProvider, $stateProvider, $urlRouterProvider) => {
  $urlRouterProvider
  .otherwise('/')
  $stateProvider
  .state('home', {
    url: '/'
  })
  .state('activate', {
    url: '/activate/:tp',
    templateUrl: 'templates/activate.html',
    resolve: {
      tpService: function($http, $stateParams) {
        return $http.get(`/activate/${$stateParams.tp}`);
      }
    },
    controller: function(tpService, $scope){
      $scope.tp = tpService.data;
    },
    controllerAs: 'tpCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'profileCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'profileCtrl'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })
  $locationProvider
  //.html5Mode(true)
  .hashPrefix('')
})

.service('auth', ['$http', 'session', Auth])
.service('session', ['$log', '$rootScope', 'localStorage', Session])
.service('dataSource', ['$http', 'session', dataSourceService])
.factory('Gravatar', GravatarFactory)
.factory('localStorage', ['$window', localStorageFactory])

.controller('profileCtrl', ['$rootScope', '$scope', '$state', 'auth', 'dataSource', 'Gravatar', 'toastr', profileCtrl])

.run(function ($rootScope, $state, auth, session) {
  $rootScope.auth = auth;
  $rootScope.session = session;

  var _from = new Date(); _from.setHours(0, 0, 0, 0);
  var _to = new Date(); _to.setHours(0, 0, 0, 0); _to.setDate(_to.getDate() + 1);
  $rootScope.filter = {from:_from, to:_to, city:false, status:'Любой'};

  // Listen for state changes when using ui-router
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    // Here we simply check if logged in but you can implement more complex logic that inspects the state to see if access is allowed or not
    //var act = /activate\/(\w*)/.test(toState.name);
    var act = /(activate)/.test(toState.name);
    console.log(toState.name);
    console.log(act);
    console.log(!act);

    if (!auth.isLoggedIn()) {
      if (toState.name !== 'login' && toState.name !== 'register' || act) {
        // Redirect to login
        $state.go('login');
        // Prevent state change
        event.preventDefault();
      }
    }
  });
})
