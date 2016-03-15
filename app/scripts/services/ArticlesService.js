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
                    console.log('get all articles - service');
                    return $http.get('/api/getArticles');
                },
                getArticleById: function(articleId) {
                    articleId = {articleId: articleId};
                    return $http.put('/api/getArticleById', articleId).success(function(data){
                        
                    });
                }
            };

    }]);

}());
