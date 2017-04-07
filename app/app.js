(function (angular) {
    "use strict";

    // start your ride
    //创建主模块；
    //'home_page','movie_list',依赖模块有先后顺序之分；
    var app = angular.module('movieCat',['home_page','movie_list','auto-active']);
    //创建控制；
    app.controller('mainController',['$scope','$location',function ($scope,$location) {
        //搜索
        $scope.query = '';
        $scope.search = function () {
            //豆瓣提供的API地址；
            //https://api.douban.com/v2/movie/search?q={text}
            //传入一个字符串参数，就是来改变页面的瞄点值；
            $location.url('/search?q='+$scope.query);
        }
    }])
})(angular);