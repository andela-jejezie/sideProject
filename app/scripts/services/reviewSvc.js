'use strict';

app.factory('ReviewSvc', function ($firebaseSimpleLogin, FIREBASE_URL, Auth, $rootScope, $cookies, $firebase) {
  var ref = new Firebase(FIREBASE_URL),
      reviewRef = ref.child('review')

  var service = {
    
    createReview: function (review, category, name) {
      var user = Auth.user
      var reviewslot = {
        reviewSlot: review.reviewnote,
        like: review.like,
        dislike: review.dislike,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        creator:user.uid
      };
      var reviewRef = $firebase(ref.child('review').child('category').child(category).child(name));
      return reviewRef.$push(reviewslot);
    },




    completeProfile: function (user) {
      var completeDetails = {
      userName: user.userName,
      location: user.userLocation, 
      picture: user.image,
      bio: user.brief_bio 
      }

      var userRef = $firebase(ref.child('user'));
      return userRef.$update(user.uid, completeDetails); 
    },

    // console.log(user.profile.$id);



    login: function (user) {
      return auth.$login('password', user);
    },
    logout: function () {
      auth.$logout();
    },
    resolveUser: function() {
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {}
  };

 

  return service;
});