'use strict';

app.controller('ReviewCtrl', function ($scope, $location, Auth, ReviewSvc, $rootScope, $firebase) {

  $scope.createReview = function(review) {
    console.log("working normally")
    ReviewSvc.createReview(review).then(function(){
      $location.path('/');
      console.log(response)
    }, function(error){
      $scope.error = true;
    });
  };

  $scope.getReview = function(){
    console.log("This is my controller")
    var obj = ReviewSvc.getReviewSvc();
    obj.$loaded().then(function(data){
      console.log(data);
    })

  };


});