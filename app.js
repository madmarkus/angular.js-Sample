var app = angular.module('planner', []).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/items', {templateUrl: 'item-list.html', controller: ListCtrl}).
            when('/items/:Id', {templateUrl: 'item-detail.html', controller: DetailCtrl}).
            otherwise({redirectTo: '/items'});
    }]);

app.directive("clickToEdit", function() {
    var editorTemplate = '<div>' +
                            '<div ng-hide="view.editorEnabled" ng-click="enableEditor()" class="editable" ' +
                                'style="width: 100%; min-height: 1.5em; display:inline-block" >' +
                                '{{value}} ' +
                            '</div>' +
                            '<form ng-show="view.editorEnabled">' +
                                '<input ng-model="view.editableValue"><br />' +
                                '<button class="btn" ng-click="save()" type="submit">Save</button>' +
                                ' or ' +
                                '<a ng-click="disableEditor()">cancel</a>.' +
                            '</form>' +
                        '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
            saveCallback: "&saveFunction"
        },
        controller: function($scope, $timeout) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.disableEditor();
                $timeout(function() {
                  $scope.saveCallback();  
                });                
            };
        }
    };
});