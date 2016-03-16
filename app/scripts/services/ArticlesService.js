/********************************
 ***** Articles Service *********
 ********************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('ArticlesService', ['$http', function($http) {

            // each function returns a promise object
            function createArticle(article) {
                return $http.post('/api/createArticle', article);
            }

            function getArticles() {
                return $http.get('/api/getArticles');
            }

            function getArticleById(articleId) {
                articleId = {articleId: articleId};
                return $http.put('/api/getArticleById', articleId).success(function(){

                });
            }

            function updateArticle(article) {
                return $http.post('/api/updateArticle', article);
            }

            function deleteArticle(articleId) {
                articleId = {articleId: articleId};
                return $http.put('/api/deleteArticle', articleId);
            }

            return {
                createArticle: createArticle,
                getAllArticles: getArticles,
                getArticleById: getArticleById,
                updateArticle: updateArticle,
                deleteArticle: deleteArticle
            };

    }]);

}());
