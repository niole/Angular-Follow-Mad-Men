'use strict';

var MadMenAppControllers = angular.module('MadMenAppControllers', []);

/*declare the services you will use as an argument to controller
the dependency injector will look at these to look up dependencies*/

MadMenAppControllers.controller('MadMenCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $scope.characterData = [
        {'name':'Don','sn':'don_draper'},
        {'name':'Peggy','sn':'PeggyOlsonMCWW'},
        {'name':'Joan','sn':'joan_holloway'},
        {'name':'Betty','sn':'bettydraper'}];

      $http.post('/streams/gettimeline/PeggyOlsonMCWW').success(
        function(data) {

        $scope.index = 0;
        $scope.mentions = data;
        $scope.displayTweet = data[0].text;

        $scope.setTweet= function(i) {
          if ( i === data.length ) {
            i = 0;
          }

          $scope.index = i;
          $scope.displayTweet = data[i].text;

        };
      }).
       error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }]);

MadMenAppControllers.controller('CharacterTweetCtrl', ['$http', '$scope', '$routeParams',
  function($http, $scope, $routeParams) {
      $scope.character = $routeParams.name;
      $http.post('/streams/gettimeline/'+$routeParams.sn).success(

        function(data) {
        console.log('CLIENT return tweet Data');
        $scope.tweetObjects = data;
      }).
       error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
}]);
