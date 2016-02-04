/****************************
 ***** Menu4 Controller *****
 ****************************/

(function() {
    'use strict';

    function quotesCtrl($scope, QuotesService) {
        console.log('Quotes  Controller');
        $scope.message = 'hi!'; 


        QuotesService.getQuotes().success(function(data){
        	console.log('recieved ', data);
            $scope.quotes = data;
        });
    }

    angular
        .module('sampleApp')
        .controller('QuotesController',  ['$scope', 'QuotesService', quotesCtrl]);

}());