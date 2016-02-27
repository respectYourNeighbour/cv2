/****************************
 ***** Main Controller ******
 ****************************/

(function() {
    'use strict';

    function mainCtrl($scope, $translate, AuthenticationService, $location, $window) {
        console.log('Main Controller');
        $scope.message = 'hi!';

        $scope.changeLanguage = function (langKey) {
            console.log('changeLanguage');
            $translate.use(langKey);
        };
        $scope.isAuthenticated = function() {
          return AuthenticationService.isAuthenticated();
        };

        /* START OF DEMO JS - NOT NEEDED */
        if (window.location === window.parent.location) {
            $('#fullscreen').html('<span class="glyphicon glyphicon-resize-small"></span>');
            $('#fullscreen').attr('href', 'http://bootsnipp.com/mouse0270/snippets/PbDb5');
            $('#fullscreen').attr('title', 'Back To Bootsnipp');
        }    
        $('#fullscreen').on('click', function(event) {
            event.preventDefault();
            window.parent.location =  $('#fullscreen').attr('href');
        });
        $('#fullscreen').tooltip();
        /* END DEMO OF JS */
        
        $('.navbar-toggler').on('click', function(event) {
            event.preventDefault();
            $(this).closest('.navbar-minimal').toggleClass('open');
        });

        //google analytics
        $window.ga('send', 'pageview', { page: $location.url() });
    }

    angular
        .module('sampleApp')
        .controller('MainController',  ['$scope', '$translate', 'AuthenticationService', '$location', '$window', mainCtrl]);

}());