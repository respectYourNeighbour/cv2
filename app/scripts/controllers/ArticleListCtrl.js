/**********************************
**** Articles List Controller ****
**********************************/

(function() {
    'use strict';

    function articleCtrl($scope, $stateParams, ArticlesService) {
        console.log('Articles List Controller');
        $scope.itemsPerPage = 6;
        $scope.currentPage = 0;

        $scope.range = function() {
            var rangeSize = $scope.itemsPerPage;
            var ret = [];
            var start;

            start = $scope.currentPage;
            if ( start > $scope.pageCount()-rangeSize ) {
                start = $scope.pageCount()-rangeSize;
            }

            for (var i=start; i<start+rangeSize; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? 'disabled' : '';
        };

        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount() - 1) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount() - 1 ? 'disabled' : '';
        };

        $scope.pageCount = function() {
            return Math.ceil($scope.total/$scope.itemsPerPage);
        };

        $scope.setPage = function(n) {
            if (n > 0 && n < $scope.pageCount()) {
                $scope.currentPage = n;
            }
        };

        $scope.filter = function() {
            console.log('changed');
        };

        $scope.$watch('currentPage', function(newValue) {
            $scope.pagedItems = ArticlesService.getPaginatedArticles(newValue*$scope.itemsPerPage, $scope.itemsPerPage).success(function(data){
                //console.log('recieved paginated data: ', data);
                $scope.articles = data.items;
                $scope.total =  data.nrItems;
            });
        });


        /*$scope.allArticlesPromise = ArticlesService.getAllArticles().success(function(data){
        console.log('articles found', data);
        //$scope.articles = data;
    });*/
}

angular
.module('sampleApp')
.controller('ArticleListController', ['$scope', '$stateParams', 'ArticlesService', articleCtrl]);

}());
