<template>
  <div>
    <button @click="location">获取定位</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      latitude: "23",
      longitude: "118"
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
      }else{
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
    }
  },
  mounted() {
    setInterval(() => {
      this.location();
    }, 5000);
  }
};
</script>

<style>
</style>

