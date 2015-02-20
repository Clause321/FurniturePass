/**
 * Created by renl on 2/19/15.
 */
var myRepoApp = angular.module("myRepoApp", []);

myRepoApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

myRepoApp.controller("repoController", ['$scope', '$http', function($scope, $http) {
    var str = window.location.href;
    var temp = str.split("/");
    var repoId = temp[4]; //this index is hard code right now, because it is kind of difficult to use angular-route
    var getLink = "/api/items/" + repoId;
    console.log(getLink);
    var repoData;
    $http.get(getLink).success(function(data){
        $scope.items= data;
    });
    //console.log(repoData);

}]);


