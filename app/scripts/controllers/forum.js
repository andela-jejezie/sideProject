'use strict';

app.controller('forumCtrl', function ($scope, Auth, FIREBASE_URL, $rootScope, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();
	console.log($scope.forumCatRef);

	$scope.createTopic = function() {
		var newTopic = {
			topic: $scope.topic,
			category: $scope.forumCatRef.value,
			message: $scope.message,
			timestamp: Firebase.ServerValue.TIMESTAMP,
			creator: $scope.user.uid
	}
		var conversationRef = $firebase(ref.child('forum_chats'));
		return conversationRef.$push(newTopic);
	}

});