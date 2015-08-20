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

     if(data in user){
      callback= false;
      return false;
     }
     else
     {

          console.log("we are here");
          
          socket.nickname=data;

          user[socket.nicrakname]= socket;

          

          console.log(" socket name" , socket.nickname);
          for(x in user)
          {
             console.log(x);
          }

          callback(true);
           updateUsers();
     }
     
    
  })

    

    socket.on('chat message', function(data){

    console.log(" in server  socket.on" , socket.nickname , "  data is  " , data);

         // io.sockets.emit('new message', {nickname: socket.nickname , msg:data});
           user[socket.nickname].emit('new message', {nickname: socket.nickname , msg:data});   // checking for personal message


    })


    function  updateUsers() {
      console.log(" users list is " , Object.keys(user));
      io.sockets.emit('userlist', Object.keys(user));

      
    }



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


