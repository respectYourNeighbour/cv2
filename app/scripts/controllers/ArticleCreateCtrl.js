/*************************************
 ***** Article Create Controller *****
 *************************************/

(function() {
    'use strict';

    function articleCreateCtrl($scope, ArticlesService, $location) {
        console.log('Article Create');

        $scope.save = function() {
            $scope.text = {
                'body' : $scope.htmlcontenttwo,
                'title': $scope.articleTitle,
                'category': $scope.articleCategory,
                'author': $scope.articleAuthor,
                'articleIcons': $scope.selectArticleIcons,
                'originalPost': $scope.originalPost
            };

	        ArticlesService.createArticle($scope.text).success(function(data) {
	        	console.log('recieve success in ctl'+data);
                $location.path('articlesList');
	        });
	    };

    }

    angular
        .module('sampleApp')
        .controller('ArticleCreateController',  ['$scope', 'ArticlesService', '$location', articleCreateCtrl]);

}());
