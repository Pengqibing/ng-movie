/**
 * Created by ice on 2017-4-6.
 */
(function (angular) {
    'use strict';
    //创建模板；
    var app = angular.module('movie_list',['ngRoute','http_server']);

    //创建路由；
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/:movieType/:page?',{
            //page参数，在url动态输入匹配页码，+？匹配不输入页码的情况,通过$routeParams显示；
            //模块字符串的路径是相对于主模板，在这里是（app.js）所在目录路径计算；
            templateUrl:'./movie_list/view.html',
            controller:'movie_listController'
        })
    }]);

    //创建控制器；
    app.controller('movie_listController',['$scope','$http','$routeParams','$route','MyService',
        function ($scope,$http,$routeParams,$route,MyService) {
        //$route 用来改变url中瞄点值的参数；
        $scope.loading = true;

        //分页计算；
            /*count = 5;
            * page1 start = 0, 0 1 2 3 4 ,
            * page2 start = 5, 5 6 7 8 9 ,
            * page3 start = 10, 10 11 12 13 14 ,
            * 由此 start = ( page - 1) * count;
            * */
            var count = 5;//表示每页请求多少条数据；
            var page = ($routeParams.page || '1') - 0; //
            //$routeParams.page获取的page,是string形式，- 0可转为数字；‘1’表示page?空白就默认第一页；
            console.log($routeParams);
            //$routeParams.movieType
            var start = (page - 1) * count;//表示从第几条数据开始；
            $scope.nowPage = page;
            var totalPage = 0;

            // MyService.jsonp('https://api.douban.com/v2/movie/in_theaters',
        MyService.jsonp('https://api.douban.com/v2/movie/'+$routeParams.movieType+'?q='+$routeParams.q,
            //+'?q='+$routeParams.q
            {start:start,count:count},function (data) {
            console.log(data);
            $scope.data = data;
            $scope.loading = false;
            totalPage = Math.ceil($scope.data.total / count);//取整；
            $scope.total = $scope.data.total; //总数据条数；
            $scope.totalPage = totalPage;//总页码数，暴露数据
            $scope.$apply();//angular 属异步请求，在最后加$apply，是告知angular数据模型已发生改变，需要同步数据；

        });


        //实现点击分页代码；
            $scope.goPage = function (nowPage) {
               //点击到下一页，可以在url路劲的基础上通过angular提供的$route来做；
               if(nowPage <= 0 || nowPage > totalPage){
                   return;
               }
                //$route提供了updateParams方法来更新url中的瞄点值，不需要在这里重新发送jonsp请求了；
                //updateParams()需要传入一个对象；
                $route.updateParams({page:nowPage})
            };
        //angular ajax请求数据,提供了$http;
            //发ajax请求，使用绝对路径，以/开头的路劲，不以./；
            //绝对路径是从网站的根目录开始；
       /* $http.get('/moviecat/app/movie_list/movie_list.json').then(function (response) {
            //response请求返回的数据；
            $scope.data = response.data;
        },function (err) {

        })*/

         /* angular跨域做真实数据请求，要求+JSON_CALLBACK参数；
          跨域请求通过jsonp来做，但因angular中返回参数callback有点，豆瓣API不支持带点参数，只能自己写jsonp做跨域数据请求；
            $http.jsonp('https://api.douban.com//v2/movie/in_theaters?JSON_CALLBACK').then(function (data) {

            })*/
    }])
})(angular);