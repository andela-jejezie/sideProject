'use strict';

/**
 * @ngdoc overview
 * @name newApp
 * @description
 * # newApp
 *
 * Main module of the application.
 */
 /* global app:true */
/* exported app */


var app = angular
  .module('newApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngMaterial',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://incandescent-fire-1226.firebaseio.com/');
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/review', {
        templateUrl:'views/review.html',
        controller:'ReviewCtrl'
      })
      .when('/business', {
        templateUrl:'views/business.html',
        controller:'ReviewCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
         }     
       }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/profileSetting', {
        templateUrl: 'views/profile_Setting.html',
        controller: 'ProfileSettingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
