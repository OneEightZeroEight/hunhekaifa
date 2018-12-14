<template>
    <div>
        <Xheader/>
        <Xnav />
        <Xcard />
    </div>
</template>
<script>
import Xheader from '../components/Xheader.vue'
import Xnav from '../components/Xnav.vue'
import Xcard from '../components/Xcard.vue'
export default {
  components: {
    Xheader,
    Xnav,
    Xcard
  }
}
</script>
