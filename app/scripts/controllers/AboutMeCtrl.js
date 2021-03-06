/****************************
 ***** Menu1 Controller *****
 ****************************/

(function() {
    'use strict';

    function menu1Ctrl($scope, HomeService) {
        console.log('About Me Controller');

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the entries
        $scope.aboutMePromise = HomeService.get()
            .success(function() {
                console.dir();
        });
    }

    angular
        .module('sampleApp')
        .controller('AboutMeController', ['$scope', 'HomeService', menu1Ctrl]);
}());
