var express= require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname+ '/public'));
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

var user={};

io.sockets.on('connection', function(socket){
	console.log(" user is connected");


  socket.on('new user', function(data,callback){

     if(data in user)
      return false;
     else
     {

          console.log("we are here");
          
          socket.nickname=data;

          user[socket.nickname]= socket;

          updateUsers();

          console.log(" socket name" , socket.nickname);
          for(x in user)
          {
             console.log(x);
          }
     }
     callback(true);
    
  })

    

    socket.on('chat message', function(data){

    console.log(" in server  socket.on" , socket.nickname , "  data is  " , data);

          io.sockets.emit('new message', {nickname: socket.nickname , msg:data});

  });


    function  updateUsers() {
      io.sockets.emit('user list', Object.keys(user));
      console.log(" users list is " , Object.keys(user));
    }
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


