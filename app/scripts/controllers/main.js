'use strict';

/**
 * @ngdoc function
 * @name newApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newApp
 */
angular.module('newApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
