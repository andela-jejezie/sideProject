'use strict';

app.controller('ReviewCtrl', function (FIREBASE_URL, $scope, $location, Auth, ReviewSvc, $rootScope, $firebase, $http) {
  var ref = new Firebase(FIREBASE_URL),
      getReviewRef = ref + '/review/category/school.json';


  $scope.createBusiness = function(business){
    console.log("createBusiness", business.review)
    ReviewSvc.createBusiness(business).then(function(response){
        var data = response.ref();
        data.once('value', function(dataSnap){
            console.log(dataSnap.val());
        })
    })
  }

  $scope.createReview = function(review) {
    console.log("working normally")
    ReviewSvc.createReview(review).then(function(){
      $location.path('/');
      //console.log(response)
    }, function(error){
      $scope.error = true;
    });
  };

  $scope.getReview = function(){
    console.log("This is my controller")
    var reviewArr = [];
   return $http.get(getReviewRef).then(function(response){
      var data = response.data
      _.forEach(data, function(reviewSnap){
        _.forEach(reviewSnap, function(snap){
          reviewArr.push(snap);
        })
      })
      $scope.reviews = reviewArr;
   })
  };









});