'use strict';

app.controller('searchByCatCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $http, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	var forumUrl = ref + '/forum_chats.json';
	var userUrl = ref + '/user/';
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();
	$scope.oneDetails = [];
	

	$scope.getCategory = function() {
	    return $http.get(ref + '/forum_chats/' + $routeParams.category + '.json'
	    	).then(function(response){
	    	var chatCollection = response.data;
			_.forEach(chatCollection, function(snap){
					var chatDetails = snap;
					return $http.get(userUrl + snap.creator + '.json').then(function(response){
						var creatorDetails = response.data;
						var object = _.merge(chatDetails, creatorDetails);
						$scope.oneDetails.push(object);
					})
			})
		})
	  };

});