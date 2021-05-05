<template>

<div>
    <detailmsg></detailmsg>
  <router-view></router-view>
</div>
</template>

<script>
import detailmsg from '@/components/detailmsg.vue'

export default {
components:{
  detailmsg,
}
}
</script>
<style lang='less' scoped>

</style>