<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <stackslist></stackslist>
  </div>
</template>

<script>
import stackslist from '@/components/stackslist.vue'

export default {
  components: {
    stackslist,
  },
}
</script>

<style lang='less' scoped>
</style>