var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
var localIpV4Address = require('local-ipv4-address')

const PORT = 3000;

localIpV4Address().then(function(ipAddress){
    console.log('---------------------------')
    console.log('Hosting on: ' + ipAddress +':'+ PORT)
    console.log('---------------------------')
})


app.get('/', function(req,res) {
    res.sendFile(__dirname+'\\index.html');
    
})

http.listen(PORT, function(){
    console.log('listening on: '+ PORT);
})

let format_message = ''
io.on('connection', function(socket){
    console.log('a user has connected')
    io.emit('update-messages', format_message)

    socket.on('disconnect', function(){
        console.log('user disconected')
    });
    socket.on('message-event', function(contents, name, userColor, timestamp) {
        format_message += "<div class='message'> <div class='name' style='color:"+userColor+"'>"+name+"</div> <div class='contents'>"+contents+"</div><div class=timestamp id=timestamp>"+timestamp+"</div> </div>"
        io.emit('update-messages', format_message)
    });

})