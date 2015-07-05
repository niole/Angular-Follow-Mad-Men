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

        var post = $http.post('/streams/gettimeline/PeggyOlsonMCWW');
        post.success(function(data) {
          $scope.index = 0;
          $scope.mentions = data;
          $scope.displayTweet = data[0].text;
          $scope.setTweet= function(i) {
            if ( i === data.length ) {
              i = 1;
            }
            $scope.index = i;
            $scope.displayTweet = data[i].text;
          };
        });
       post.error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }]);

MadMenAppControllers.controller('CharacterTweetCtrl', ['$http', '$scope', '$routeParams',
  function($http, $scope, $routeParams) {
      $scope.character = $routeParams.name;

      var post = $http.post('/streams/gettimeline/'+$routeParams.sn);
      post.success(
        function(data) {
          $scope.tweetObjects = data;
          var avgFavs = 0;
          var avgRetweets = 0;
          data.forEach( function(obj) {
            avgFavs += obj.favorite_count;
            avgRetweets += obj.retweet_count;
          });
          $scope.startDate = data[0].created_at;
          $scope.endDate = data[data.length-1].created_at;
          $scope.avgFavs = avgFavs/(data.length);
          $scope.avgRetweets = avgRetweets/(data.length);
          $scope.numFollowers = data[0].user.followers_count;
          $scope.numFriends = data[0].user.friends_count;

          var ePs = [];
          $scope.pickEndPt= function(i,data) {
            ePs.push(i);
            if ( ePs.length === 2 ) {
              var start = Math.min(ePs[0],ePs[1]);
              var end = Math.max(ePs[0],ePs[1]);
              for ( i=start; i<end; i++ ) {
                avgFavs += data[i].favorite_count;
                avgRetweets += data[i].retweet_count;
              }

              $scope.startDate = data[start].created_at;
              $scope.endDate = data[end].created_at;
              $scope.avgFavs = avgFavs/(end-start);
              $scope.avgRetweets = avgRetweets/(end-start);
            }
            if ( ePs.length > 2 ) {
              ePs = [i];
            }
          };
      });
      post.error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
}]);
