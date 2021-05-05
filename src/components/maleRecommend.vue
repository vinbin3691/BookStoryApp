<template>
  <!-- <div>1111</div> -->
  <div class='maleRecommend'>
    <div class="bg"></div>
    <recommendTitle :malehot="malehot"  @update:hotrecommendIndex="hotrecommendIndex=$event"
    ></recommendTitle>
  
     <maleRecImg :hotrecommendIndex="hotrecommendIndex"></maleRecImg>
  
    
    
  </div>
</template>

<script>
import recommendTitle from '@/components/recommendTitle.vue'
import maleRecImg from '@/components/maleRecImg.vue'

export default {
  components: {
    recommendTitle,
    maleRecImg,
  },
  data: function () {
    return {
      malehot: true,
      hotrecommendIndex: 0,
    }
  },
}
// 54d42d92321052167dfb75e3
</script>



<style lang='less' scoped>
.bg{
  height: 10px;
  background-color: #f0f0f0;
}
.maleRecommend{
  
  background-color:white;
}
</style>