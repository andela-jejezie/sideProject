'use strict';

app.controller('ReviewCtrl', function ($scope, $location, Auth, ReviewSvc, $rootScope, $firebase) {


  $scope.create = function(review, category, name) {
    console.log(review);
    console.log(category);
    console.log(name);
    ReviewSvc.createReview(review, category, name).then(function(){
      $location.path('/');
    }, function(error){
      $scope.error = true;
    });
  };

});






















