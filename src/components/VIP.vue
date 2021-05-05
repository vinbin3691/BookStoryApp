<template>
  <div class='viptotal'>
    <div class="bg"></div>
    <div class="vipTitle">
      <h2 class="left">
        <i></i>
        <span>会员点击榜单</span>
      </h2>
      <a class="right">
        <img src="../image/all.png" alt  @click="clickAllshow(vipid)"/>
      </a>
    </div>
    <viplist :vip="vip"></viplist>

    <!-- <vipAll></vipAll> -->
  </div>
</template>

<script>
import viplist from '@/components/viplist.vue'
// import vipAll from '@/components/vipAll.vue'


export default {
  data: function () {
    return {
      vipid: '5a683b68fc84c2b8efa68fc2',
    }
  },
  components: {
    viplist,
    
  },
  computed:{
     vip: function () {
      return this.$store.state.vip;
    },
  },
  methods:{
    clickAllshow:function(id) {
        this.$router.push({
        path: '/vipAll',
        query: {
          id,
        },
      })
    }
  }
}
</script>

<style scoped lang='less'>
@color: #f26552;
.bg{
  background-color:#f0f0f0;
  height: 10px;
}
.viptotal{
  background-color: white;
.vipTitle {
  
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
    margin-top: 12px;
    margin-right: 10px;
    // background-color: red;
    img {
      width: 45px;
      height: 14px;
    }
  }
}
}

</style>