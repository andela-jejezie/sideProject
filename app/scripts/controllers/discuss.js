'use strict';

app.controller('discussCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $http, $route, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	var forumUrl = ref + '/forum_chats/';
	var userUrl = ref + '/user/';
	var forumRef = ref.child('forum_chats');
	var usersRef = ref.child('user');
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();

	$scope.findOneTopic = function() {
		return $http.get(forumUrl + $routeParams.category + '/' + $routeParams.topic + '.json' ).then(function(response){
			$scope.topicDetails = response.data;
			return $http.get(userUrl + response.data.creator + '.json').then(function(res){
				$scope.userDetails = res.data;
			})
		})
	};


	$scope.getComment = function() {
		$scope.details = [];
		return $http.get(forumUrl + $routeParams.category + '/' + $routeParams.topic + '/comments.json').then(function(response){
			var collection = response.data;
			_.forEach(collection, function(snap){
				var chatDetails = snap;
					return $http.get(userUrl + snap.creator + '.json').then(function(res){
						var commentCreatorDetails = res.data;
						var object = _.merge(chatDetails, commentCreatorDetails);
						$scope.details.push(object);
					})
			})
		})
	};

	$scope.saveComment = function(){

		return $http.get(forumUrl + $routeParams.category + '/' + $routeParams.topic + '/commentCount.json').then(function(response){
			var numOfComment = response.data + 1;

			var conversationRef = $firebase(ref.child('forum_chats').child($routeParams.category).child($routeParams.topic));
			conversationRef.$update({commentCount: numOfComment}).then(function(){
				var commentDetails = {
					comment: $scope.comment,
					creator: $scope.user.uid,
					timestamp: Firebase.ServerValue.TIMESTAMP
				}

				var commentRef = $firebase(ref.child('forum_chats').child($routeParams.category).child($routeParams.topic).child('comments'));
				return commentRef.$push( commentDetails ).then(function(){
					$route.reload();
				})
			})
		})
	
	};




});