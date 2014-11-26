'use strict';

/**
 * @ngdoc function
 * @name newApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the newApp
 */
angular.module('newApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
