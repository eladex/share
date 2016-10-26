angular.module("app").factory('classificationService',['$http', function($http){
        var classificationService ={};
        classificationService.searchSources = function(query){
            return $http.get('/api/nova/autocomplete/source/' + query);
        };
        classificationService.searchPublishPrecedure =function(query){
            return $http.get('/api/nova/autocomplete/publishProcedure/' + query);
        };
        classificationService.searchShoss =function(query){
            return $http.get('/api/nova/autocomplete/shoss/' + query);
        };
        return classificationService;
}]);
