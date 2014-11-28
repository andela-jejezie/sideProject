'use strict';

app.controller('ProfileSettingCtrl', function ($rootScope, $scope, $location, Auth, $firebase) {

	console.log($scope.user);
  $scope.error = false;

  // var appCtrl = this;

$scope.user = Auth.user;


});