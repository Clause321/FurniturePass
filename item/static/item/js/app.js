var myRepoApp = angular.module('myRepoApp', []);
myRepoApp.config(function($interpolateProvider){
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});







