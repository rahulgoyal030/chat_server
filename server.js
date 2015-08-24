var express= require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname+ '/public'));
app.get('/', function(req, res){

  res.sendfile(__dirname+"/index.html");

  
});

// var emoji = require('node-emoji');
// console.log(emoji.get('coffee')); // returns the emoji code for coffee (displays emoji on terminals that support it) 
// console.log(emoji.which(emoji.get('coffee'))); // returns coffee 
// console.log(emoji.get(':fast_forward:')); // also supports github flavored markdown emoji (http://www.emoji-cheat-sheet.com/) 
// console.log(emoji.emojify('I :heart: :coffee:!')); // 

var emoji = require('node-emoji').emoji;
console.log(" it is  a emoji" , emoji.heart); // returns the emoji code for coffee (displays emoji on terminals that support it) 
console.log(emoji.fast_forward); // retreive

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


