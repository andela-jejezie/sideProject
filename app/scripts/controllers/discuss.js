'use strict';

app.controller('discussCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $route, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	var forumRef = ref.child('forum_chats');
	var usersRef = ref.child('user');
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();

	$scope.findOneTopic = function() {
		$scope.topicDetails = $firebase(forumRef.child($routeParams.category).child($routeParams.topic)).$asObject();

		$scope.topicDetails.$loaded().then(function(data){
			console.log(data);
			$scope.userDetails = $firebase(usersRef.child(data.creator)).$asObject();
		})

	};


	$scope.getComment = function() {

		$scope.details = [];
		$scope.topicComment = $firebase(forumRef.child($routeParams.category).child($routeParams.topic).child('comments')).$asObject();

		$scope.topicComment.$loaded().then(function(data){
			data.forEach(function(k){
				var commentCreatorDetails = $firebase(usersRef.child(k.creator)).$asObject();

				commentCreatorDetails.$loaded().then(function(userSnap){
					var object = merge( userSnap, k);
					$scope.details.push(object);
				})
			})
		})
	}

	$scope.saveComment = function(){
		var commentDetails = {
			comment: $scope.comment,
			creator: $scope.user.uid,
			timestamp: Firebase.ServerValue.TIMESTAMP
		}


		var commentRef = $firebase(ref.child('forum_chats').child($routeParams.category).child($routeParams.topic).child('comments'));
		return commentRef.$push( commentDetails ).then(function(){
        	$route.reload();
	})
	};


	var merge = function() {
		var obj = {},
	    	i = 0,
	    	il = arguments.length,
	    	key;
		for (; i < il; i++) {
	    	for (key in arguments[i]) {
	        	if (arguments[i].hasOwnProperty(key)) {
	            	obj[key] = arguments[i][key];
	        	}
	    	}
		}
		return obj;
	};




});