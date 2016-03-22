/****************************
 **** Article Controller ****
 ****************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams, ArticlesService, resolveGetArticleById, $sce, $location) {
        console.log('Article Details Controller');
        $scope.editMode = false;

        // get article details from the resolve function in app.routes
        $scope.articleDetail = {
            author: resolveGetArticleById.data.author,
            title: resolveGetArticleById.data.title,
            category: resolveGetArticleById.data.category,
            id: resolveGetArticleById.data._id,
            body: $sce.trustAsHtml(resolveGetArticleById.data.body),
            originalPost: resolveGetArticleById.data.originalPost,
            articleIcons: resolveGetArticleById.data.articleIcons
        };

        $scope.editArticle = function(articleId) {
            ArticlesService.getArticleById(articleId).success(function(data) {
                console.log('successfuly brought the article by id!', data);
                $scope.editMode = true;
                $scope.articleEditting = {
                    author: data.author,
                    title: data.title,
                    category: data.category,
                    id: data._id,
                    body: data.body,
                    originalPost: data.originalPost,
                    articleIcons: data.articleIcons
                };
            });
        };

        $scope.cancelEditting =function() {
            console.log('Cancel Edit Mode!');
            $scope.editMode = false;
            console.log('3 what is articleEdditing?', $scope.articleEdditing);
        };

        $scope.updateArticle = function(articleId) {
            $scope.edittedArticle = {
                'body' : $scope.articleEditting.body,
                'title': $scope.articleEditting.title,
                'category': $scope.articleEditting.category,
                'author': $scope.articleEditting.author,
                'id': articleId,
                'originalPost': $scope.articleEditting.originalPost,
                'articleIcons': $scope.articleEditting.articleIcons
            };

            $scope.articleDetail = {
                'body' : $scope.articleEditting.body,
                'title': $scope.articleEditting.title,
                'category': $scope.articleEditting.category,
                'author': $scope.articleEditting.author,
                'id': articleId,
                'originalPost': $scope.articleEditting.originalPost,
                'articleIcons': $scope.articleEditting.articleIcons
            };

	        ArticlesService.updateArticle($scope.edittedArticle).success(function(data) {
                console.log('updated article: ',data);
                $scope.editMode = false;
	        });
	    };

        $scope.deleteArticle = function() {
            $('#deleteArticleModal').modal('show');
        };

        $scope.confirmDelete = function(articleId) {
            $('#deleteArticleModal').modal('hide');
            $('#deleteArticleModal').on('hidden.bs.modal', function () {
                ArticlesService.deleteArticle(articleId).success(function(data) {
                    console.log('successfuly deleted the article by id!', data);
                    $location.path('articlesList');
                });
            });
        };
    }

    angular
        .module('sampleApp')
        .controller('ArticleDetailController',  ['$scope', '$stateParams', 'ArticlesService', 'resolveGetArticleById', '$sce', '$location', articleCtrl]);

}());
