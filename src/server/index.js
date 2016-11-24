  var express = require('express');
  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  app.use(express.static("../"));
  server.listen(8000);

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../index.html');
  });


  var onlineCount = 0;
  var onlineUsers = {};
  var avatars = ["2014","2015","2016","2017","2021","2022", "caijie","monkey", "shenli"];

  io.on('connection', function (socket) {
      
      socket.on("login", function(param)
      {
          socket.name = param;
        
          
          if (onlineUsers.hasOwnProperty(socket.name))
          {
              socket.emit("loginFaile","");
          }
          else{
              
              onlineCount++;
              console.log(socket.name + "用户进入聊天室");
              socket.emit("loginSucceed","");

              var rd = onlineCount % avatars.length;
              onlineUsers[socket.name] = avatars[rd];
              console.log(onlineUsers);

              var data = {};
              data.name = "管理员";
              data.count = onlineCount;
              data.msg = "欢迎" + socket.name + "进入聊天室";
              data.style = "background:url('./images/avatar/steven.jpg');background-size: cover;";
              io.emit("notice", data);//群发消息
          }
      })

      socket.on("talk", function(param)
      {

              var data = {};
              data.name = param.name;
              data.count = onlineCount;
              data.msg = param.msg;
            
              data.style = `background:url('./images/avatar/${onlineUsers[data.name]}.jpg');background-size: cover;`;
              io.emit("notice", data);//群发消息
      })

      socket.on('disconnect', function () {
          console.log(socket.name + "用户离开聊天室");
          onlineCount--;
          if (onlineUsers.hasOwnProperty(socket.name))
          {
              delete onlineUsers[socket.name];
          }
         
      });

  });



