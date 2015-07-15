var app = angular.module("HomePage", ["ui.bootstrap", "ngRoute", "ngAnimate"]);

app.config(function ($routeProvider, $locationProvider) {
    //Controls the routing for the site
    $routeProvider
        .when("/",
        {
            templateUrl: "HTML/Home.html",
            controller: "HomePageController"
        })
        .when("/About",
        {
            templateUrl: "HTML/About.html",
            controller: "AboutPageController"
        })
        .when("/Contact",
        {
            templateUrl: "HTML/Contact.html",
            controller: "ContactPageController"
        })
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);
});

app.controller("PageContentController", function ($scope, $location, $rootScope, $route) {

    //Used to collapse nav bar button
    $scope.isCollapsed = true;

    //This is used to select the correct sliding animation
    $scope.pageArray = ['Home', 'About', 'Contact'];

    //Value is either true or false
    $scope.slideAnimationRight = true;

    //Decides whether the slide right or left animation should be used
    $scope.ChooseAnimation = function (upcomingLocation) {
        var urlArray = $route.current.templateUrl.split("/") || null;
        if (urlArray == null) return;
        var currentLocation = (urlArray[urlArray.length - 1]).split(".")[0];

        if($scope.pageArray.indexOf(upcomingLocation) > $scope.pageArray.indexOf(currentLocation)){
            $scope.slideAnimationRight = false;
        }
        else if ($scope.pageArray.indexOf(upcomingLocation) < $scope.pageArray.indexOf(currentLocation)) {
            $scope.slideAnimationRight = true;
        }
    }
});

app.controller("HomePageController", function ($scope) {
    $scope.message = "test";
});

app.controller("AboutPageController", function ($scope) {
    $scope.message = "test1";
});

app.controller("ContactPageController", function ($scope) {

    //Basic information about the user
    $scope.email = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.message = "";

    //Creates footer
    $scope.GetFooter = function () {
        return "Best,\n" + $scope.firstName + " " + $scope.lastName;
    }

    //Creates entire message
    $scope.CreateMessage = function () {
        if ($scope.message == "")
            return "";

        return $scope.message + "\n\n" + $scope.GetFooter();
    }

    //Sends out the email
    $scope.Submit = function () {
        $.ajax({
            url: "PHP/MailHandler.php",
            data: { to: $scope.email, message: $scope.CreateMessage() },
            success: function (response) {
                //display success alert
            },
            error: function () {
                //display error
            }
        });
    }

});

