var app = angular.module("HomePage", ["ui.bootstrap", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Home",
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
        .otherwise({ redirectTo: "/Home" });

    $locationProvider.html5Mode(true);
});

app.controller("PageContentController", function ($scope, $location, $rootScope, $route) {

    //Used to collapse nav bar button
    $scope.isCollapsed = true;

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
    $scope.getFooter = function () {
        return "Best,\n" + $scope.firstName + " " + $scope.lastName;
    }

    //Creates entire message
    $scope.createMessage = function () {
        if ($scope.message == "")
            return "";

        return $scope.message + "\n\n" + $scope.getFooter();
    }

    //Sends out the email
    $scope.submit = function () {
        $.ajax({
            url: "PHP/MailHandler.php",
            data: { to: $scope.email, message: $scope.createMessage() },
            success: function (response) {
                //display success alert
            },
            error: function () {
                //display error
            }
        });
    }

});

