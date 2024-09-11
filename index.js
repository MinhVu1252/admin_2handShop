var express = require('express')
var app = express();
var sql = require("mssql");
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const multer = require('multer');
const storage = require('storage');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var sql = require("./lib/sql");
app.get('/index', function(req, res) {
    res.sendFile(__dirname + "/dangnhap.html");
});
app.get('/thongtin', function(req, res) {
    res.sendFile(__dirname + "/thongtin.html");
});
app.get('/capnhat', function(req, res) {
    res.sendFile(__dirname + "/capnhat.html");
});

app.post('/userLogin', function (req, res) {
    // config for your database
    sql.executeSQL("select * from tbl_admin1 where [user] = '"+req.body.userName+"' and pass='"+req.body.password+"'" , (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
app.post('/update', function (req, res) {
    // config for your databaseselect
    sql.executeSQL(" UPDATE tbl_admin1 SET name = '"+req.body.name+"' ,[user] = '"+req.body.userName+"', pass = '"+req.body.password+"' WHERE id = '"+req.body.id+"';" , (recordset) => {
        res.send(recordset.recordsets[0]);
    })
});
// function storagefileIMG(fileName, extend){
//     var storage = multer.diskStorage({
//         destination: function(req, file, cb){
//             cb(null, 'img')
//         },
//         filename: function(req, file, cb){
//             cb(null, fileName+ extend);
//         }
//     });
//     return storage;
// }
// app.post('/uploadphoto', multer({storage: storagefileIMG('img', '.jpg')}).single('img1'), function (req, res, next) {
//     if (!req.file) {
//         res.status(400).send('No image file provided.');
//       } else {
//         const imagePath = req.file.path;
    
//         // Thực hiện câu lệnh SQL để cập nhật cơ sở dữ liệu
//         const sql = 'UPDATE table_name SET image_path = ? WHERE id = ?';
//         const params = [imagePath, req.body.id];
    
//         connection.query(sql, params, (err, result) => {
//           if (err) {
//             console.error('Error updating image path in database: ' + err);
//             res.status(500).send('Error updating image path in database.');
//           } else {
//             res.redirect('/admin');
//           }
//         });
//       }
//   })
app.get('/getAllProduct', function (req, res) {
    // config for your database
   sql.executeSQL("select * from tbl_admin1", (recordset)=>{
   res.send(recordset.recordsets[0]);
   })
});
app.get('/getCus', function (req, res) {
    // config for your database
   sql.executeSQL("select * from tbl_admin", (recordset)=>{
   res.send(recordset.recordsets[0]);
   })
});
var server = app.listen(3002, function() {
    console.log('Server is running..');
});