/**
 * Created by ice on 2017-4-6.
 */
(function (angular) {
    'use strict';
    var app = angular.module('auto-active',[]);

    //自定义指定需要用驼峰形式命名；
    app.directive('autoActive',[function () {
        //template ,指定一个模板；
        //template ,指定一个模板
        // restrict , 指定自定义指定的使用方式
        // replace , true
        // trasclude 转置
        // scope {'aa':'@自定义指令所在标签的属性'}
        return {
            link:function (scope, element, attributes) {
                //scope 暴露数据到模板中使用
                //element 是自定义指定所在标签的jqLite对象
                //angular.element();
                //attributes 是自定义指定所在标签的所有属性的集合，是个object对象；
                //给li标签注册点击事件；
                element.on('click',function () {
                    //移除所有兄弟元素active样式；
                    element.parent().children().removeClass('active');
                    //添加当前样式
                    element.addClass('active');
                })
            }
        }
    }])
})(angular);