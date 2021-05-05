<template>
  <div class="maleretitle">
    <div class="reommendTitle">
      <h2 class="left">
        <i></i>
        <span>火爆热销</span>
      </h2>
      <a class="right">
        <img src="../image/blue-change.png" alt @click="clickChange"/>
      </a>
    </div>
    <!-- 火爆热销列表 -->
    <maleRecImg :hotrecommendIndex="hotrecommendIndex"></maleRecImg>
  </div>
</template>

<script>
import maleRecImg from '@/components/maleRecImg.vue'

export default {
  components: {
    maleRecImg,
  },
  data: function () {
    return {
      hotrecommendIndex: 0,
    }
  },
  methods:{
     clickChange: function () {
      this.hotrecommendIndex=this.hotrecommendIndex>=2?0:this.hotrecommendIndex+1
      console.log(this.hotrecommendIndex)
      this.$emit('update:hotrecommendIndex',this.hotrecommendIndex)
 },
  }
}
</script>

<style lang='less' scoped>
@color: #3498db;
.maleretitle {
  margin-top: 10px;
  background-color: white;
}
.reommendTitle {
  font-size: 16px;
  width: 90%;
  height: 38px;
  box-sizing: border-box;
  text-align: left;
  margin: 0 auto;
  //   清浮动
  overflow: auto;
  zoom: 1;
  .left {
    padding: 10px 12px 10px 0px;
    height: 100%;
    width: 100%;
    float: left;
    //  margin:0 auto;
    max-width: 60%;
    i {
      //   line-height: 27px;
      width: 4px;
      height: 16px;
      background-color: @color;
      float: left;
      margin: 0px 10px 0px 0px;
    }
    span {
      line-height: 16px;
      color: #333;
    }
  }
  .right {
    // padding: 12px 10px;
    float: right;
    margin-top: 13.5px;
    margin-right: 10px;
    img {
      width: 68px;
      border: 0px;
    }
  }
}
</style>