app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider
        .state('login', {
            url: '/login',
            controller : 'loginController',
            templateUrl: 'partials/login.html'
        })
        .state('chat', {
            url: '/chat',
            controller : 'chatController',
            templateUrl: 'partials/chat.html'
        })
        .state('addChannel', {
            url: '/addChannel',
            controller : 'channelController',
            templateUrl: 'partials/addChannel.html'
        });

});