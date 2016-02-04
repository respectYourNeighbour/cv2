/****************************
 ******* Quotes Service *****
 ****************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('QuotesService', ['$http', function($http) {

            // each function returns a promise object 
            return {
                // call to get all entries
                getQuotes : function() {
                    return $http.get('/api/getQuotes').success(function(data){
                        console.log('this is the new entry that was inserted in DB and now comes back from the API in the Service:');
                        return data;
                    });
                }
            };       

    }]);

}());



