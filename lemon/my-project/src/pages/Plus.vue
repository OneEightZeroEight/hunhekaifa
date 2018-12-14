<template>
  <div>
    <button @click="location">获取定位</button>
    <button @click="startRecord()">开始录音</button>
    <button @click="stopRecord()">停止录音</button>
    <button @click="startPlay()">开始播放</button>
    <button @click="stopPlay()">停止播放</button>
    <input @change="uploadImg" type="file" id="file" name="avatar">
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      latitude: "23",
      longitude: "118",
      r: null,
      p: null,
      path: ""
    };
  },
  methods: {
    location() {
      var that = this;
      if (window.plus) {
        plus.geolocation.getCurrentPosition(
          function(p) {
            //   alert(
            //     "Geolocation\nLatitude:" +
            //       p.coords.latitude +
            //       "\nLongitude:" +
            //       p.coords.longitude +
            //       "\nAltitude:" +
            //       p.coords.altitude
            //   );
            that.latitude = p.coords.latitude;
            that.longitude = p.coords.longitude;
            that.sendLocation();
          },
          function(e) {
            alert("Geolocation error: " + e.message);
          }
        );
      } else {
        that.sendLocation();
      }
    },
    sendLocation() {
      var that = this;
      axios
        .get("http://10.3.136.180:9999/sendPostion", {
          params: {
            latitude: that.latitude,
            longitude: that.longitude
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(() => {});
    },
    startRecord() {
      if (this.r == null) {
        alert("Device not ready!");
        return;
      }
      this.r.record(
        { filename: "_doc/audio/" },
        e => {
          console.log(e);
          this.path = e;
          alert("Audio record success!");
        },
        e => {
          alert("Audio record failed: " + e.message);
        }
      );
    },
    stopRecord() {
      this.r.stop();
    },
    startPlay() {
      console.log(this.path);
      if (plus.audio == undefined) {
        alert("Device not ready!");
      }
      this.p = plus.audio.createPlayer(this.path);
      this.p.play(
        function() {
          alert("Audio play success!");
        },
        function(e) {
          alert("Audio play error: " + e.message);
        }
      );
    },
    stopPlay() {
      this.p.stop();
    },
    uploadImg() {
      // ref
      var fileNode = document.getElementById("file");
      var xmlhttp = new XMLHttpRequest();
      //设置回调，当请求的状态发生变化时，就会被调用
      xmlhttp.onreadystatechange = function() {
        //上传成功，返回的文件名，设置到父节点的背景中
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          console.log(xmlhttp.responseText);
        }
      };
      //构造form数据
      var data = new FormData();
      console.log(fileNode.files);
      data.append("avatar", fileNode.files[0]);
      console.log(data);
      //设置请求，true：表示异步
      xmlhttp.open("post", "http://10.3.136.180:9999/requireImg", true);
      //不要缓存
      //xmlhttp.setRequestHeader("If-Modified-Since", "0");
      //提交请求
      xmlhttp.send(data);
      //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了
      fileNode.value = null;
    }
  },
  mounted() {
    // setInterval(() => {
    //   this.location();
    // }, 5000);
    this.r = plus.audio.getRecorder();
  }
};
</script>

<style>
button {
  width: 500px;
  height: 500px;
  font-size: 50px;
  border: 1px solid red;
}
</style>

