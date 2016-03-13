/*********************************
 ***** TextEditor Controller *****
 *********************************/

(function() {
    'use strict';

    function textEditorCtrl($scope, TextEditorService) {
        console.log('TextEditor  Controller', $scope.htmlcontent);
        $scope.message = 'hi!';

        

        $scope.save = function() {
            $scope.text = {
                'body' : $scope.htmlcontenttwo,
                'title': 'manually inserted',
                'category': 'manual',
                'author': 'Me'
            };

	        TextEditorService.sendText($scope.text).success(function(data) {
	        	console.log('recieve success in ctl'+data);
	        });
	    };

    }

    angular
        .module('sampleApp')
        .controller('TextEditorController',  ['$scope', 'TextEditorService', textEditorCtrl]);

}());