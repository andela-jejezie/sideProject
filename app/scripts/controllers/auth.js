'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth, user, $rootScope, $firebase) {


  $scope.error = false;

  // var appCtrl = this;

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };


  if (Auth.signedIn()) {
    $location.path('/');
  }

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $location.path('/');
    }, function(error){
      $scope.error = true;
    });
  };

  $scope.register = function () {
    Auth.register($scope.user).then(function(user) {
      console.log(user);
      return Auth.login($scope.user).then(function() {
        user.firstname = $scope.user.firstname;
        user.lastname = $scope.user.lastname;
        user.email = $scope.user.email;
        user.password = $scope.user.password;
        return Auth.createProfile(user);
      }).then(function(){
        $location.path('/profileSetting');
      });
      }, function(error){
        $scope.error = true;
      });
    };

});






















