<template>
<div>
  <div class='total'>
  <div class="reommendTitle">
    <h2 class="left">
      <i></i>
      <span v-show='rehot'>热门推荐</span>
      <span v-show='malehot'>男频热销</span>
      <span v-show='femalehot'>女频热销</span>
      <span v-show='vipAll'>点击榜</span>
      <span v-show='vip'>鲜花榜</span>
      <span v-show='malesort'>男生频道</span>



    </h2>
    <a class="right" @click="clickChange"  v-show='!vipAll&&!vip&&!malesort'>
      <img src="../image/hotchange.png" alt />
    </a>
  </div>
</div>
</div>
</template>

<script>
export default {
  props:['rehot','malehot','femalehot','vipAll','vip','malesort'],
  data: function () {
    return {
      hotrecommendIndex: 0,
      // rehot:false,
    }
  },
  methods: {
    clickChange: function () {
      this.hotrecommendIndex=this.hotrecommendIndex>=2?0:this.hotrecommendIndex+1
      // console.log(this.hotrecommendIndex)
      this.$emit('update:hotrecommendIndex',this.hotrecommendIndex)
 },
  },

}
</script>

<style scoped lang='less'>
@color: #f26552;

.total{
  background-color: white;
  margin-top: 10px;
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