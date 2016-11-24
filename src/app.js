(function(angular) {
    angular.module('app', ['ngRoute'])
        .controller('appCtrl',  function($scope, $location) {
                $scope.msglist = [];//[{"name":"zhangliang","say":"22222222222222222"},{"name":"lisi","say":"fdasfdfffffffffffff"}];
                $scope.name = "";   //用户名已
                $scope.count = 0;    //当前房间用户数
                $scope.sendmsg = ""; //发送文本消息
                $scope.isShowFaceBox = false;

                $scope.loginState = false;
                $scope.socket = io.connect('http://10.0.129.188:8000/');
                

                $scope.logout  = function()
                {
                    // $scope.socket.disconnect();
                }

                $scope.socket.on('loginFaile', function () { // 登录失败
                          alert("用户名已被使用,请重试！");              
                                        
                 });
                 
                 $scope.socket.on('loginSucceed', function () {  //登录成功
                     
                     $scope.loginState = true;    
                     $scope.$apply();              
                 });

                 $scope.socket.on('notice', function (data) {  //消息通知
                     
                     $scope.count = data.count;
                     $scope.msglist.push(data);
                     $scope.$apply();      

                     $('#chatArea').scrollTop( $('#chatArea')[0].scrollHeight );        
                 });

                $scope.usernameSubmit =function()  //游客登录
                {
                    if ($scope.name.length == 0)
                        alert("名字不能为空");

                   $scope.socket.emit("login",$scope.name)
                    
                }

                $scope.onSendmsg = function() //发送消息
                {
                    var data = {};
                    data.name = $scope.name;
                    data.msg = $("#editArea").html();
                
                    console.log($("#editArea").html());
                    $scope.socket.emit("talk",data);
                    $("#editArea").html("");
                }    

                $scope.showFaceBox = function()
                {
                    $scope.isShowFaceBox = !$scope.isShowFaceBox;
                }


        })
        .filter("htmlContent", function($sce)
        {
                return function(input) {
		            return $sce.trustAsHtml(input);
	            }
        })
        // .config(function($routeProvider, $translateProvider,$locationProvider) {
        //     $routeProvider
        //         .when('/home', {
        //             templateUrl: 'apps/pe/_static/views/home/home.html',
        //             controller: 'HomeController'

        //         })
        //         .otherwise({
        //             redirectTo: '/home'
        //         });

        //     $translateProvider.translations("zh", translations_zh);
        //     $translateProvider.preferredLanguage('zh');
        // });



})(window.angular);