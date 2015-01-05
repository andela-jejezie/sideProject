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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload',
    'google.places',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://side-project.firebaseio.com/');
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
      .when('/forum', {
        templateUrl: 'views/forum.html',
        controller: 'forumCtrl'
      })
      .when('/forum/newtopic', {
        templateUrl: 'views/new_topic.html',
        controller: 'newTopicCtrl'
      })
      .when('/forum/:category', {
        templateUrl: 'views/search_category.html',
        controller: 'searchByCatCtrl'
      })
      .when('/forum/:category/:topic', {
        templateUrl: 'views/topic_discussion.html',
        controller: 'discussCtrl'
      })
      .when('/forum/:value', {
        templateUrl: 'views/forum.html',
        controller: 'forumCtrl'
      })
      .when('/forum/search/:topic', {
        templateUrl: 'views/search_topic.html',
        controller: 'searchByTopicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
