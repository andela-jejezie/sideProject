
'use strict';

app.controller('categoryListCtrl', function ($scope, Auth, FIREBASE_URL, $routeParams, $rootScope, $http, $firebase) {
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
					var object = _.merge(snap.category, snap.topic);
					topicCategory.push(object);
				})
			})
		}).then(function(){
			$( "#search" ).autocomplete({
      			source: allTopic,

		})
		
    });

	
}
});



	
