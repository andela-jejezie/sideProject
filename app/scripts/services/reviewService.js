'use strict';

app.factory('ReviewSvc', function (FIREBASE_URL, Auth, $firebase) {
  var ref = new Firebase(FIREBASE_URL);

  var service = {
    
    createReview: function (review) {
      // console.log("right inside the factory")
      var user = Auth.user,
          category = review.category,
          name = review.name;
      var reviewslot = {
        reviewSlot: review.note,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        creator:user.uid
      };
      var reviewRef = $firebase(ref.child('review').child('category').child(category).child(name));
      return reviewRef.$push(reviewslot);
    },

    getReviewSvc: function(){
      console.log("right inside the factory")
      return $firebase(ref.child('review').child('category')).$asObject()
    }

  };
  return service;
});