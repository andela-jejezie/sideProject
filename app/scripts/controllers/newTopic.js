'use strict';

app.controller('newTopicCtrl', function ($scope, Auth, FIREBASE_URL, $rootScope, $location, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();
	
	$scope.createTopic = function() {
		var newTopic = {
			topic: $scope.topic,
			category: $scope.forumCatRef.value,
			message: $scope.message,
			timestamp: Firebase.ServerValue.TIMESTAMP,
			creator: $scope.user.uid
	}
		var conversationRef = $firebase(ref.child('forum_chats').child($scope.forumCatRef.value));
		return conversationRef.$set($scope.topic, newTopic).then(function(){
        $location.path('forum/' + $scope.forumCatRef.value + '/' + $scope.topic );
      });
	}
	 

});