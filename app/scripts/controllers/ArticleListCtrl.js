/****************************
 **** Article Controller ****
 ****************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams, ArticlesService) {
        console.log('Articles List Controller');

        ArticlesService.getArticles().success(function(data){
        	console.log('articles found', data);
        	$scope.articles = data;
        });
    }

    angular
        .module('sampleApp')
        .controller('ArticleListController',  ['$scope', '$stateParams', 'ArticlesService', articleCtrl]);

}());