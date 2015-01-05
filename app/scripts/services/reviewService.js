'use strict';

app.factory('ReviewSvc', function (FIREBASE_URL, Auth, $firebase) {
  var ref = new Firebase(FIREBASE_URL);

  var service = {

    createBusiness: function(business) {
      // console.log("right inside the factory")
      var user = Auth.user
      var businessSlot = {
        name:business.name,
        country:business.country,
        address:business.address,
        city:business.city,
        state:business.state,
        zip:business.zip,
        phoneNumber:business.phoneNumber,
        website:business.website,
      }
      var reviewSlot = {
        name:business.name,
        reviewSlot: business.review,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        creator:user.uid
      };

      $firebase(ref.child('review').child('category').child(business.category).child(business.name)).$push(reviewSlot)
      var businessRef = $firebase(ref.child('business').child(business.name));
      return businessRef.$set(businessSlot);
    },
    
    createReview: function (review) {
      // console.log("right inside the factory")
      var user = Auth.user,
          category = review.category,
          name = review.name;
      var reviewslot = {
        name:review.name,
        reviewSlot: review.note,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        creator:user.uid
      };
      var reviewRef = $firebase(ref.child('review').child('category').child(category).child(name));
      return reviewRef.$push(reviewslot);
    },

    getReviewSvc: function(){
      console.log("right inside the factory")
      return $firebase(ref.child('review').child('category').child('school').child('Andela')).$asObject()
    }

  };
  return service;
});