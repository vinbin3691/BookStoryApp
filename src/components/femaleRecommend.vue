<template>
  <!-- <div>1111</div> -->
  <div class='maleRecommend'>
    <div class='bg'></div>
    <recommendTitle :femalehot="femalehot"  @update:hotrecommendIndex="hotrecommendIndex=$event"
    ></recommendTitle>
    <!-- <maleRecImg :hotrecommendIndex="hotrecommendIndex"></maleRecImg> -->
 
      <FemaleRecImg :hotrecommendIndex="hotrecommendIndex"></FemaleRecImg>


  </div>
</template>

<script>
import recommendTitle from '@/components/recommendTitle.vue'
import FemaleRecImg from '@/components/FemaleRecImg.vue'

export default {
  components: {
    recommendTitle,
    FemaleRecImg
  },
  data: function () {
    return {
      femalehot: true,
      hotrecommendIndex: 0,
    }
  },
}
// 54d42d92321052167dfb75e3
</script>



<style lang='less' scoped>
.maleRecommend{
  // margin-top: 15px;
  background-color:white;
}
.bg{
  height: 10px;
  background-color: #f0f0f0;
}
</style>