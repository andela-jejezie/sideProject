
'use strict';

app.controller('categoryListCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $location, $rootScope, $http, $firebase) {
	$scope.user = Auth.user;
	var ref = new Firebase(FIREBASE_URL);
	var forumUrl = ref + '/forum_chats.json';
	var userUrl = ref + '/user/';


	$scope.forumCatRef = $firebase(ref.child('forum_category')).$asObject();


  	$scope.getTopic = function(){
  		var topicCategory =[];
		var allTopic = [];
		return $http.get(ref + '/forum_chats.json').then(function(response){
			var chatCollection = response.data;
			_.forEach(chatCollection, function(data){
				_.forEach(data, function(snap){
					allTopic.push(snap.topic);
				})
			})
		})
		.then(function(){
			$( "#search" ).autocomplete({
      			source: allTopic,
      			select: function(event, ui) {
                $scope.searchTopic(ui.item.label);
            }

			})
		
    	});


	};
	
	$scope.searchTopic = function(val) {
		var search = val.toLowerCase();
		return $http.get(ref + '/forum_chats.json').then(function(response){
			_.forEach(response.data, function(snap){
				_.forEach(snap, function(res){
					var topic = res.topic.toLowerCase();
					if(topic == search) {
						$location.path('forum/' + res.category + '/' + res.topic);
					}
				})
			})
		}) 

	}


});



	
