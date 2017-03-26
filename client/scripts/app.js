import angular from 'angular'
import 'angular-jwt'
import 'angular-resource'
import 'angular-toastr'
import 'angular-ui-router'
import 'angular-ui-mask'

var Auth = require('./services/Auth');
var Session = require('./services/Session');
var dataSourceService = require('./services/dataSource');
var GravatarFactory = require('./services/Gravatar');
var localStorageFactory = require('./services/localStorage');

var activateCtrl = require('./controllers/Activate');
var profileCtrl = require('./controllers/Profile');
var usersCtrl = require('./controllers/Users');

angular
.module('rfbGO', ["angular-jwt", "ngResource", "toastr", "ui.router", "ui.mask"])
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
    controller: 'activateCtrl'
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
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html'//,
    //controller: 'profileCtrl'
  })
  .state('users', {
    url: '/users',
    templateUrl: 'templates/users.html',
    controller: 'usersCtrl'
  })
  $locationProvider
  //.html5Mode(true)
  .hashPrefix('')
})

.service('auth', ['$http', 'session', Auth])
.service('session', ['$log', '$rootScope', 'jwtHelper', 'localStorage', Session])
.service('dataSource', ['$http', 'session', dataSourceService])
.factory('Gravatar', GravatarFactory)
.factory('localStorage', ['$window', localStorageFactory])

.controller('activateCtrl', ['$http', '$rootScope', '$scope', '$state', '$stateParams', 'auth', 'toastr', activateCtrl])
.controller('profileCtrl', ['$rootScope', '$scope', '$state', 'auth', 'dataSource', 'Gravatar', 'toastr', profileCtrl])
.controller('usersCtrl', ['$rootScope', '$scope', '$state', 'dataSource', usersCtrl])

.run(function ($rootScope, $state, auth, session) {
  $rootScope.auth = auth;
  $rootScope.session = session;
  $rootScope.cities = [
    {id: '0', name: 'Консультант банка'},
    {id: '1', name: 'Партнёр-продавец'}
  ];
  $rootScope.roles = [
    {id: '0', name: 'Консультант банка'},
    {id: '1', name: 'Партнёр-продавец'}
  ];

  var _from = new Date();
  console.log(_from);
  _from.setHours(0, 0, 0, 0);
  var _to = new Date(); _to.setHours(0, 0, 0, 0); _to.setDate(_to.getDate() + 1);
  $rootScope.filter = {from:_from, to:_to, city:false, status:'Любой'};

  // Listen for state changes when using ui-router
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    // Here we simply check if logged in but you can implement more complex logic that inspects the state to see if access is allowed or not
    if (!auth.isLoggedIn()) {
      if (toState.name !== 'activate' && toState.name !== 'login' && toState.name !== 'register') {
        // Redirect to login
        $state.go('login');
        // Prevent state change
        event.preventDefault();
      }
    }
  });
})
