var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3001);

io.on("connection",function (socket) { // .on để lắng nghe xem có ai kết nối lên không ; khi có kết nối server tạo biến socket để quản lí kết nối đến, chạy function( có tham số là biến socket)
    console.log("co nguoi ket noi : "+ socket.id);
    socket.on("disconnect",function(){
        console.log(socket.id + " da ngat ket noi!!");
    });

    socket.on("client_send_data" , function(data){
        var c = data.a + data.b;
        // io.sockets.emit("server-send-data",data + "888")  //gửi dữ liệu về tất cả client kết nối tới A,B,C
        socket.emit("server-send-data",c) //chỉ gửi dữ liệu cho A
        // socket.broadcast.emit("server-send-data",data + "888") //chỉ gửi dữ liệu cho B,C
    })
});

app.get("/",function(req , res){
    res.render("sum");
})