<template>
  <div class="booktotal">
    <div class="bg"></div>
    <div class="vipTitle">
      <h2 class="left">
        <i></i>
        <span>鲜花榜</span>
      </h2>
      <a class="right">
        <img src="../image/all.png" alt @click="newBookAllClick(nwwBookAllId)" />
      </a>
    </div>
    <viplist :renewbook="renewbook"></viplist>
  </div>
</template>

<script>
import viplist from '@/components/viplist.vue'
export default {
  components: {
    viplist,
  },
  data: function () {
    return {
      nwwBookAllId: '5a39ca3ffc84c2b8ef82da82',
    }
  },
  computed: {
    renewbook: function () {
      return this.$store.state.renewbook
    },
  },
  methods: {
    newBookAllClick: function (id) {
      this.$router.push({
        path: '/vipAll',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style scoped lang='less'>
@color: #f26552;
.bg{
  background-color: #f0f0f0;
  height: 10px;
}
.booktotal {
  background-color: white;
}
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
</style>