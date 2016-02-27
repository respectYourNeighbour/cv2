/****************************
 **** Article Controller ****
 ****************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams) {
        console.log('ArticleCtrl with id: ' + $stateParams.articleID);
        $scope.message = 'hi!'; 
        $scope.phoneId = $stateParams.phoneId;
    }

    angular
        .module('sampleApp')
        .controller('ArticleController',  ['$scope', '$stateParams', articleCtrl]);

}());