'use strict';

//creates the main app module
//the second arg lists the modules that the app depends on

var MadMenApp = angular.module('MadMenApp', [
  'ngRoute',
  'MadMenAppControllers',
  'MadMenFilters',
  'MadMenServices',
  'MadMenAnimations'
]);

MadMenApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/mentions', {
        templateUrl: 'partials/character-list.html',
        controller: 'MadMenCtrl'
      }).
      when('/mentions/:name/:sn', {
        templateUrl: 'partials/character-tweets.html',
        controller: 'CharacterTweetCtrl'
      }).
      otherwise({
        redirectTo: '/mentions'
      });
  }]);
