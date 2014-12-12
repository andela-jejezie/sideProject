'use strict';

app.controller('ProfileSettingCtrl', function ($scope, $location, Auth, $rootScope, $firebase) {
	$scope.user = Auth.user;

	$scope.handleFileSelect = function($files) {
		$scope.files = $files;
		$scope.images = '';
		var reader = new FileReader();
		reader.onload = function(e) {
			$scope.images = e.target.result;
		}
		reader.readAsDataURL($scope.files[0]);
	};

	$scope.saveDetails = function() {
		$scope.details = {
			userName: $scope.detail.username, 
			userLocation: $scope.detail.userLocation.name, 
			image: $scope.images,
			brief_bio: $scope.detail.brief_bio,
			uid: $scope.user.uid
		}

		Auth.completeProfile($scope.details).then(function(ref){
			console.log('Success');
		}).then(function(){
			$location.path('/');
		});
	};

	$scope.getLocation = function(val) {
	    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
	      params: {
	        address: val,
	        sensor: false
	      }
	    }).then(function(response){
	      return response.data.results.map(function(item){
	        return item.formatted_address;
	      });
	    });
	 };
});