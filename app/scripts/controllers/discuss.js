'use strict';

app.controller('discussCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $firebase){
	var ref = new Firebase(FIREBASE_URL);
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();
	$scope.findOneTopic = function() {
		$scope.topicDetails = $firebase(ref.child('forum_chats').child($routeParams.category).child($routeParams.topic)).$asObject();

		$scope.topicDetails.$loaded().then(function(data){
			console.log(data);
			$scope.userDetails = $firebase(ref.child('user').child(data.creator)).$asObject();
		})
		// console.log($scope.topicDetails.creator);
		// $scope.userDetails = $firebase(ref.child('user').child($scope.topicDetails.creator)).$asObject();

	}
});