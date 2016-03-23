/**********************************
 ***** Portofolio Controller ******
 **********************************/

(function() {
    'use strict';

    function portofolioCtrl($scope, $translate, AuthenticationService, $location, $window, AclService) {
        console.log('Portofolio Controller');

        //google analytics
        $scope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { page: $location.url() });
        });
    }

    angular
        .module('sampleApp')
        .controller('PortofolioController',  ['$scope', '$translate', 'AuthenticationService', '$location', '$window', 'AclService', portofolioCtrl]);

}());
