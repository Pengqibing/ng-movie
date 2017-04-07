/**
 * Created by ice on 2017-4-5.
 */
(function (angular) {
    'use strict';
    //创建模板；
    var app = angular.module('http_server',[]);
    //创建服务；
    app.service('MyService',['$window',function ($window) {
        this.jsonp = function (url, arg, fn) {
            //将arg传递过来的参数拼接到url后面，https://api.douban.com/v2/movie/in_theaters?start=2&count=5&、
            var sumString = '';
            for(var key in arg){
               sumString += key + '='+ arg[key] + '&'
            }
            url = url + '?' + sumString;
            /* 给传递的匿名fn一个函数名；
            var myCallBack = fn;
            window.myCallBack = fn; //全局函数
            myJsonp("https://api.douban.com/v2/movie/in_theaters",{start:2,count:5},function (data) {
             console.log(111);
             });
             myJsonp("https://api.douban.com/v2/movie/in_theaters",{start:2,count:5},function (data) {
             console.log(333);
             });
             避免出现这种重复调用函数时，同时加载，后面的数据会覆盖前面的，需要通过随机数来命名函数名；
             */
            var mycallbackName = 'jsonp_'+ Math.random().toString().substr(2);

            //Math.random(),是数字的形式，函数不能一数字开头，前面加了字符jsonp;
            //url中不能出现点，所有通过toString()转为字符串，substr(2)去掉前面两个字符串，就把点去掉；
            //拼接CALLBACK函数；
            //window[mycallbackName] = fn;
            //在myJsonp()方法执行后，移除script标签；
            $window[mycallbackName] = function (data) {
                fn(data);
                $window.document.body.removeChild(scriptEle);
            };
            url = url + 'callback=' + mycallbackName;/*(+后面需要函数名，方便调用函数;"mycallback"加字符串表示只需要这个函数名，不加的话，就是函数体了)*/

            //动态创建script标签；
            var scriptEle = $window.document.createElement('script');
            scriptEle.src = url;
            $window.document.body.appendChild(scriptEle);
        }
    }])
})(angular);