/****************************
 **** Article Controller ****
 ****************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams, ArticlesService, myFunc, $sce) {
        console.log('Article Details Controller');
        $scope.message = 'hi!'; 
        $scope.phoneId = $stateParams.phoneId;

        $scope.articleDetail = myFunc.data;
       // $sce.trustAsHtml(myFunc.data);

       $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml(myFunc.data.body);
             };
    }

    angular
        .module('sampleApp')
        .controller('ArticleDetailController',  ['$scope', '$stateParams', 'ArticlesService', 'myFunc', '$sce', articleCtrl]);

}());