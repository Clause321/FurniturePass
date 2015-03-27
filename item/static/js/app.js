/**
 * Created by renl on 2/19/15.
 */
var myRepoApp = angular.module("myRepoApp", ['ui.bootstrap']);

myRepoApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

myRepoApp.controller("repoController", ['$scope', '$http', function($scope, $http) {
    $scope.itemsPerPage = 2;
    $scope.filteredItems = [];
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.totalItems = 0

    var str = window.location.href;
    var temp = str.split("/");
    var repoId = temp[4]; //this index is hard code right now, because it is kind of difficult to use angular-route
    var getLink = "/api/items/" + repoId;
    console.log(getLink);
    $http.get(getLink).success(function(data){
        $scope.items= data;
        $scope.totalItems = $scope.items.length;

        $scope.$watch('currentPage + itemsPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            var end = begin + $scope.itemsPerPage;

            $scope.filteredItems = $scope.items.slice(begin, end);
        });
    });




    //console.log(repoData);

}]);


