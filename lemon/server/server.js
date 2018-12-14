var express = require("express");
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})
var app = express();
// app.get("/sendPostion", (req, res) => {
//     res.append("Access-Control-Allow-Origin", "*")
//     console.log("获取经纬度");
//     console.log(req.query)
//     res.send({
//         state: "success"
//     })
// })

app.post("/requireImg", upload.single('avatar'), (req, res) => {
    console.log(req)
    res.append("Access-Control-Allow-Origin", "*")
    console.log("获取经纬度");
    console.log(req.query)
    res.send({
        state: "success"
    })
})
app.listen(9999)