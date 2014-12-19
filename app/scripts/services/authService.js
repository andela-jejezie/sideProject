'use strict';

app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $cookies, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },

    createProfile: function (user) {
      var profile = {
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        md5_hash: user.md5_hash,
        timestamp: Firebase.ServerValue.TIMESTAMP
      };

      var userRef = $firebase(ref.child('user'));
      return userRef.$set(user.uid, profile);
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



  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
    Auth.user.profile = $firebase(ref.child('user').child(Auth.user.uid)).$asObject();
    console.log(Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    if(Auth.user && Auth.user.profile){
      Auth.user.profile.$destroy();
    }
    angular.copy({}, Auth.user);
   
  });
 

  return Auth;
});























