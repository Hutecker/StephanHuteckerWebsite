var app = angular.module("HomePage", ["ui.bootstrap"]);

app.controller("PageContentController", function ($scope, $location, $rootScope) {

    //Used to collapse nav bar button
    $scope.isCollapsed = true;

    //This string determines what page is loaded
    $scope.currentPage = "Home";

    //This is called every time the URL changes
    $scope.$on("$locationChangeStart", function (event, next, current) {
        $scope.currentPage = event.currentScope.currentPage;
    });

    //Used to redirect urls
    $scope.isActive = function (viewLocation) {
        $("#HtmlTitle").text($scope.currentPage);
        history.replaceState("", "", viewLocation);
        //This enables using back and forward buttons in browser
        //$location.path(viewLocation);
        $scope.currentPage = viewLocation.replace("/", "");
    };
});

app.controller("HomePageController", function ($scope) {


});

app.controller("AboutPageController", function ($scope) {

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

