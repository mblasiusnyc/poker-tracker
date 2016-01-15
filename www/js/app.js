'use strict';

angular.module('pokerTrackerApp', [
	'ionic',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'angularMoment'
])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom')

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.sessions', {
    url: '/sessions',
    views: {
      'tab-sessions': {
        templateUrl: 'templates/tab-sessions.html',
        controller: 'SessionsCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('session', {
    url: '/session/:sessionId',
    templateUrl: 'templates/session.html',
    controller: 'SessionCtrl'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/sessions');
  // $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
})

  	// OLD STATES
    // $stateProvider
    // 	.state('sessions', {
    //     url: '/sessions',
    //     templateUrl: 'app/views/sessions.html',
    //     controller: 'SessionsCtrl'
    //   })
    // 	.state('session', {
    //     url: '/session/:sessionId',
    //     templateUrl: 'app/views/session.html',
    //     controller: 'SessionCtrl'
    //   })
    // 	.state('createCashGame', {
    //     url: '/sessions/createCashGame',
    //     templateUrl: 'app/views/cashgame.html',
    //     controller: 'CashGameCtrl'
    //   })
    // $urlRouterProvider.otherwise('/sessions');


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
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

// .run(function ($rootScope, $location, Auth, amMoment) {
//   // Redirect to login if route requires auth and you're not logged in
//   $rootScope.$on('$stateChangeStart', function (event, next) {
//     Auth.isLoggedInAsync(function(loggedIn) {
//       if (next.authenticate && !loggedIn) {
//         event.preventDefault();
//         $location.path('/login');
//       }
//     });
//   });
//   amMoment.changeLocale('de');
// })

.run(function (amMoment) {
  amMoment.changeLocale('de');
 });
