'use strict';

app.controller('forumCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $firebase){
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();
	$scope.details = [];

	$scope.chatDetails = function() {
		var chatCollection = $firebase(ref.child('forum_chats')).$asObject();
		var userRef = $firebase(ref.child('user'));
		chatCollection.$loaded().then(function(data){
			console.log(data);
			data.forEach(function(value, key){
				for(var k in value) {
					console.log(value[k]);
					var creatorDetails = $firebase(ref.child('user').child(value[k].creator)).$asObject();

					creatorDetails.$loaded().then(function(userSnap){
					var object = merge( userSnap, value[k]);
					$scope.details.push(object);
				})
				}
				

			})			
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