'use strict';


/**
 *
 * Main module of the application.
 */
angular
	.module('sampleApp', [
			'ui.router',
			'ngAnimate',
            'templates-main',
			'pascalprecht.translate',
			'ngCookies',
			'angularUtils.directives.dirPagination',
			'cgBusy',
			'satellizer',
			'toastr',
            'textAngular',
            'ngSanitize',
			'mm.acl'
	])
	.config(function ($stateProvider, $translateProvider, $urlRouterProvider) {
		function skipIfLoggedIn($q, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				console.log('skipIfLoggedIn');
        		deferred.reject();
			} else {
        		deferred.resolve();
			}
			return deferred.promise;
    	}

	    function loginRequired($q, $location, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				console.log('loginRequired');
				$location.path('/login');
			}
			return deferred.promise;
	    }

        $stateProvider
            // home page
	        .state('/', {
	            templateUrl: 'views/home.html',
				url : '/',
	        })
	        .state('aboutMe', {
				resolve: {
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_about_me')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
				},
	            templateUrl: 'views/aboutMe.html',
	            url : '/aboutMe',
	            controller: 'AboutMeController'
	        })
	        .state('articlesList', {
				resolve: {
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_article_list')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
				},
	            templateUrl: 'views/articlesList.html',
	            url : '/articlesList',
	            controller: 'ArticleListController'
	        })
	        .state('viewArticleDetail', {
				resolve: {
	        		resolveGetArticleById: function($stateParams, ArticlesService) {
	        			return ArticlesService.getArticleById($stateParams.articleId).success(function(data){
				            console.log('found the article: ', data);
				        });
	        		},
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_article_detail')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
	        	},
	        	url: '/viewArticleDetail/:articleId',
	        	templateUrl: 'views/articleDetail.html',
	        	controller: 'ArticleDetailController'
			})
	        .state('articleCreate', {
				resolve: {
		        	loginRequired: loginRequired,
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_article_create')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
	            templateUrl: 'views/articleCreate.html',
	            url : '/textEditor',
	            controller: 'ArticleCreateController'
	        })
			.state('portofolio', {
				resolve: {
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_portofolio')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
				templateUrl: 'views/portofolio.html',
	            url : '/portofolio',
	            controller: 'PortofolioController'
			})
	        .state('messages', {
				resolve: {
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_messages')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
		        abstract: true,
		        url: '/messages',
		        template: '<ui-view/>'
		    })
	        .state('messages.list', {
				resolve: {
		        	loginRequired: loginRequired,
					unreadMessages : function(ContactService) {
						return ContactService.getUnreadMessages();
					},
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_messages')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
	            templateUrl: 'views/messages.html',
	            url : '',
	            controller: 'MessagesController',
	        })
	        .state('messages.view', {
				resolve: {
					message: function(ContactService,$stateParams) {
						console.log('$stateParams',$stateParams);
						return ContactService.getMessage($stateParams.messageId);
					},
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_messages')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
	        	},
	        	url: '/:messageId',
	        	templateUrl: 'views/messageView.html',
	        	controller: 'MessageViewController'
			})
	        .state('contact', {
				resolve: {
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_contact')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
	        	},
	            templateUrl: 'views/contact.html',
	            url : '/contact',
	            controller: 'ContactController'
	        })
	        .state('login', {
				resolve: {
					skipIfLoggedIn: skipIfLoggedIn,
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_login')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
	            templateUrl: 'views/login.html',
	            url : '/login',
	            controller: 'LoginController'
	        })
	        .state('signup', {
				resolve: {
					skipIfLoggedIn: skipIfLoggedIn,
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_signup')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
	            templateUrl: 'views/signup.html',
	            url : '/signup',
	            controller: 'SignupController'
	        })
	        .state('logout', {
	            template : null,
	            url : '/logout',
	            controller: 'LogoutController'
	        })
	        .state('profile', {
				resolve: {
					loginRequired: loginRequired,
					'acl' : ['$q', 'AclService', function($q, AclService){
						if(AclService.can('can_profile')){
							//Has proper permissions
							return true;
						}else{
							//Does not have permission
							return $q.reject('Unauthorized');
						}
					}]
		        },
	            templateUrl: 'views/profile.html',
	            url : '/profile',
	            controller: 'ProfileController'
	        })
	        .state('admin', {
	            abstract: true,
		        url: '/admin',
		        template: '<ui-view/>'
	        })
	        .state('admin.login', {
	            templateUrl: 'views/admin/adminLogin.html',
	            url : '',
	            controller: 'AdminLoginController'
	        });
	        $urlRouterProvider.otherwise('/');
        //Translations
        $translateProvider

            .useStaticFilesLoader({
                prefix: 'translations/locale-',
                suffix: '.json'
            })
            // tells angular-translate which of the registered languages is the one that should be used by default.
            .preferredLanguage('de')
            .registerAvailableLanguageKeys(['en', 'de', 'fr', 'ro'], {
                'en_*': 'en',
                'de_*': 'de',
                'fr_*': 'fr',
                'ro_*': 'ro'
            })
            // This method tries to determine by itself what the preferred language would be.
            .determinePreferredLanguage()
            // fallback language. If there isn't a translation id in the German translation table, angular-translate will search for it in the English or French translation table, etc.
            .fallbackLanguage(['en'])
            // remember language
            .useLocalStorage();
    })
	.run(['AclService', '$rootScope', '$location', function(AclService, $rootScope, $location) {
		var aclData = {
			guest: ['can_about_me', 'can_article_list', 'can_article_detail', 'can_portofolio'],
			online: ['can_about_me', 'can_article_list', 'can_article_detail', 'can_login'],
			member: ['can_about_me', 'can_article_list', 'can_article_detail', 'can_portofolio', 'can_contact', 'can_messages', 'can_login', 'can_signup', 'can_profile'],
			admin: ['can_about_me', 'can_article_list', 'can_article_detail', 'can_article_create', 'can_portofolio', 'can_contact', 'can_messages', 'can_login', 'can_signup', 'can_profile']
		};
		AclService.setAbilities(aclData);
		AclService.attachRole('online');

		//If the route change failed due to our "Unauthorized" error, redirect them
		$rootScope.$on('$routeChangeError', function(current, previous, rejection){
			if(rejection === 'Unauthorized'){
				$location.path('/');
			}
		});
	}]);
