'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth, $rootScope) {


	$scope.user = Auth.user;


  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;

  // console.log(Auth.user.profile.firstName);

 

});