/****************************
 **** Article Controller ****
 ****************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams, ArticlesService) {
        console.log('ArticleCtrl with id: ' + $stateParams.articleID);
        $scope.message = 'hi!'; 
        $scope.phoneId = $stateParams.phoneId;

        ArticlesService.getArticles().success(function(data){
        	console.log('articles found', data);
        });
    }

    angular
        .module('sampleApp')
        .controller('ArticleController',  ['$scope', '$stateParams', 'ArticlesService', articleCtrl]);

}());