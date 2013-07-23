function ListCtrl($scope, $http) {
    $http.get('./items.json').success(function (data) {
        $scope.items = data;
    }).error(
        function(){
            console.log("Failed to load items.");
        });

    $scope.saveEditor = function () {

        $scope.saveItem(this.item);
    };

    $scope.saveItem = function (w) {
        console.log("Attempt to safe: ");
        console.log(w);       
        $http.post("http://localhost:8888", w, {}).success(function () {
                console.log("post successfully sent");
        }).error(function (data, status, headers, config) {
                    console.log("Error on save.");
        });
 
    };
}

function DetailCtrl($scope, $routeParams) {
    $scope.Id = $routeParams.Id;
}