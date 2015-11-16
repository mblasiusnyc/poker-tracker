'use strict';

angular.module('pokerTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'angularMoment'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $stateProvider
    	.state('sessions', {
        url: '/sessions',
        templateUrl: 'app/views/sessions.html',
        controller: 'SessionsCtrl'
      })
    	.state('session', {
        url: '/session/:sessionId',
        templateUrl: 'app/views/session.html',
        controller: 'SessionCtrl'
      })
    	.state('createCashGame', {
        url: '/sessions/createCashGame',
        templateUrl: 'app/views/cashgame.html',
        controller: 'CashGameCtrl'
      })
      // .state('main', {
      //   url: '/',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainCtrl'
      // })
    $urlRouterProvider.otherwise('/sessions');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, amMoment) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
    amMoment.changeLocale('de');
  });
