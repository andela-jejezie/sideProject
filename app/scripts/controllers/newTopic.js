'use strict';

app.controller('newTopicCtrl', function ($scope, Auth, FIREBASE_URL, $rootScope, $location, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();
	
	$scope.createTopic = function() {
		var pubDate = new Date ();
		var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
		var date =  monthname[pubDate.getMonth()] + ' ' + pubDate.getDate() + ', ' + pubDate.getFullYear();
		var newTopic = {
			topic: $scope.topic,
			category: $scope.forumCatRef.value,
			message: $scope.message,
			chatTimestamp: date,
			creator: $scope.user.uid,
			commentCount: 0
	}
		var conversationRef = $firebase(ref.child('forum_chats').child($scope.forumCatRef.value));
		return conversationRef.$set($scope.topic, newTopic).then(function(){
        $location.path('forum/' + $scope.forumCatRef.value + '/' + $scope.topic );
      });
	}
	 

});