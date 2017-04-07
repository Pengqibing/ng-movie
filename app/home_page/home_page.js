/**
 * Created by ice on 2017-4-6.
 */
(function (angular) {
    'use strict';
    var app = angular.module('home_page',['ngRoute']);

    //创建路由；
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/home_page',{
            templateUrl:'./home_page/view.html',
            controller:'home_pageController'
        })
    }]);

    //创建控制器；
    app.controller('home_pageController',['$scope',function ($scope) {
        //....
    }])
})(angular);