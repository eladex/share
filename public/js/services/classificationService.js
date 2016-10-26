angular.module("app").factory('classificationService',['$http', function($http){
        var classificationService ={};
        classificationService.searchSources = function(query){
            return $http.get('/file.json');
        };
        
        return classificationService;
}]);
