var app = angular.module('HomePage', ['ui.bootstrap']);

app.controller('PageContentController', function ($scope, $location) {

    //Used to redirect urls
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    //Used to collapse nav bar button
    $scope.isCollapsed = true;

    //This string determines what page is loaded
    $scope.currentPage = "Home";
});

app.controller('HomePageController', function ($scope, $location) {


});

app.controller('AboutPageController', function ($scope, $location) {

});

app.controller('ContactPageController', function ($scope, $location) {

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
            url: 'PHP/MailHandler.php',
            data: {to: $scope.email, message: $scope.createMessage()},
            success: function (response) {
                //display success alert
            },
            error: function () {
                //display error
            }
        });
    }

});

