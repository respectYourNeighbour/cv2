/********************************
 ***** Articles Service *********
 ********************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('ArticlesService', ['$http', function($http) {

            // each function returns a promise object
            return {
                getArticles : function() {
                    console.log('getArticles');
                    return $http.get('/api/getArticles');
                }
            };

    }]);

}());