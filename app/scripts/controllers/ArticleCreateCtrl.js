/*************************************
 ***** Article Create Controller *****
 *************************************/

(function() {
    'use strict';

    function articleCreateCtrl($scope, TextEditorService) {
        console.log('Article Create');     

        $scope.save = function() {
            $scope.text = {
                'body' : $scope.htmlcontenttwo,
                'title': $scope.articleTitle,
                'category': $scope.articleCategory,
                'author': $scope.articleAuthor
            };

	        TextEditorService.sendText($scope.text).success(function(data) {
	        	console.log('recieve success in ctl'+data);
	        });
	    };

    }

    angular
        .module('sampleApp')
        .controller('ArticleCreateController',  ['$scope', 'TextEditorService', articleCreateCtrl]);

}());