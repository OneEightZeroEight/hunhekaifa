var express = require("express");
var app = express();
app.get("/sendPostion",(req,res)=>{
    res.append("Access-Control-Allow-Origin","*")
    console.log("获取经纬度");
    console.log(req.query)
    res.send({
        state:"success"
    })
})
app.listen(9999)