var express= require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname+ '/public'));
app.get('/', function(req, res){

  
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

          user[socket.nickname]= socket;
          io.sockets.emit('user data', Object.keys(user));

          

          console.log(" socket name" , socket.nickname);
          
          for(x in user)
          {
             console.log(x);
          }

          
           updateUsers();
       //    io.sockets.emit('user data', Object.keys(user));
       console.log(" we are reaching here")
           callback(true);
     }

     
    
  })

    

    socket.on('chat message', function(data){

    console.log(" in server  socket.on" , socket.nickname , "  data is  " , data);

         io.sockets.emit('new message', {nickname: socket.nickname , msg:data});
          // user[socket.nickname].emit('new message', {nickname: socket.nickname , msg:data});   // checking for personal message

       //io.sockets.emit('user data', Object.keys(user));


    })


    function  updateUsers() {
      console.log(" users list is " , Object.keys(user));
   
     
      io.sockets.emit('user data', Object.keys(user));

      console.log("emitted")

      
    }

    function checking(){
      console(" caliing can be done ");
    }



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


