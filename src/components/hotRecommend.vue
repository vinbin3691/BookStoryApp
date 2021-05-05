<template>
  <div class="hotRecommend">
    <div class="bg"></div>
    <recommendTitle 
     @update:hotrecommendIndex="hotrecommendIndex=$event"
      :rehot='rehot'
     >
      <solt></solt>
    </recommendTitle>      
    <!--  -->
  
    <recomendlist :hotrecommendIndex='hotrecommendIndex'></recomendlist>
  </div>
</template>
<script>
import recommendTitle from '@/components/recommendTitle.vue'
import recomendlist from '@/components/recomendlist.vue'

export default {
  components: {
    recommendTitle,
    recomendlist,
  },
  data: function () {
    return {
      hotrecommendIndex: 0,
      rehot:true,
    }
  },
}
// http://novel.kele8.cn/rank/5a39d435fc84c2b8ef884798
</script>

<style lang="less" scoped>
.bg{
  background-color: #f0f0f0;
  height: 10px;
}
.hotRecommend{
  background-color: white;
}
</style>
