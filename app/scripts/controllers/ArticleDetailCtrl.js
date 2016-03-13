/****************************
 **** Article Controller ****
 ****************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams, ArticlesService) {
        console.log('ArticleCtrl detail with id: ' + $stateParams.articleID);
        $scope.message = 'hi!'; 
        $scope.phoneId = $stateParams.phoneId;
        $scope.article = '1';

        ArticlesService.getArticles().success(function(data){
        	console.log('articles found', data);
        	$scope.articles = data;
        });
    }

    angular
        .module('sampleApp')
        .controller('ArticleDetailController',  ['$scope', '$stateParams', 'ArticlesService', articleCtrl]);

}());