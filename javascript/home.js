var app = angular.module('HomePage', ['ui.bootstrap']);

app.controller('NavBarController', function ($scope, $location) {

    //Used to redirect urls
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    //Used to collapse nav bar button
    $scope.isCollapsed = true;
});

