angular.module("app").factory('tagsService',['$http', function($http){
        var tagsService ={};
        tagsService.searchTags = function(query){
            return $http.get('/tags.json');
        };
        
        return tagsService;
}]);
