'use strict';

app.controller('forumCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $http, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	var forumUrl = ref + '/forum_chats.json';
	var userUrl = ref + '/user/';
	$scope.allDetails = [];

	$scope.chatDetails = function() {
		return $http.get(forumUrl).then(function(response){
			var chatCollection = response.data;
			_.forEach(chatCollection, function(data){
				_.forEach(data, function(snap){
					var chatDetails = snap;
					return $http.get(userUrl + snap.creator + '.json').then(function(response){
						var creatorDetails = response.data;
						var object = _.merge(chatDetails, creatorDetails);
						$scope.allDetails.push(object);
					})
				})
			})
		})
		
	};

});