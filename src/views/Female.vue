<template>
  <div>
    <header>
      <a class="arrow_left" @click="$router.go(-1)">
        <span></span>
      </a>
      <h2>女生频道</h2>

      <a href class="user">
        <span></span>
      </a>
    </header>
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" /> -->
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in fearr" :key="index" @click="felunboClick(item._id)">
        <img :src="item.img" alt />
      </van-swipe-item>
      <!-- <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>-->
    </van-swipe>

    <!-- 女生热门推荐-->
    <div class="total">
      <!-- <div class="bg"></div> -->
      <div class="reommendTitle">
        <h2 class="left">
          <i></i>
          <span>热门推荐</span>
        </h2>
        <a class="right" @click="clickChange">
          <img src="../image/fechange.png" alt />
        </a>
      </div>
      <!-- 女生热门推荐组件 -->
      <recomendlist :femalhot="femalhot" :hotrecommendIndex="hotrecommendIndex"></recomendlist>
    </div>

    <!-- 女生火热畅销-->
    <div class="total">
      <div class="bg"></div>
      <div class="reommendTitle">
        <h2 class="left">
          <i></i>
          <span>火热畅销</span>
        </h2>
      </div>
      <!-- 女生火热畅销组件 -->
      <fehuore></fehuore>
    </div>

    <!-- 女生潜力榜  -->
    <div class="total">
      <div class="bg"></div>
      <div class="reommendTitle">
        <h2 class="left">
          <i></i>
          <span>潜力榜</span>
        </h2>
      </div>
      <!-- 女生潜力榜组件 -->
      <fehuore :feqianli="feqianli"></fehuore>
    </div>

    <!-- 女生完结版 -->
    <div class="total">
      <div class="bg"></div>
      <div class="reommendTitle">
        <h2 class="left">
          <i></i>
          <span>追书完结榜</span>
        </h2>
      </div>
      <!-- 女生潜力榜组件 -->
      <viplist :fewanjie="fewanjie"></viplist>
    </div>
  </div>
</template>

<script>
import recomendlist from '@/components/recomendlist.vue'
import fehuore from '@/components/fehuore.vue'
import viplist from '@/components/viplist.vue'

export default {
  components: {
    recomendlist,
    fehuore,
    viplist,
  },
  data: function () {
    return {
      value: '',
      fearr: [],
      hotrecommendIndex: 0,
    }
  },
  computed: {
    femalhot() {
      return this.$store.state.femalhot
    },
    feqianli() {
      return this.$store.state.femalhot
    },
    fewanjie() {
      return this.$store.state.fewanjie
    },
  },
  created() {
    this.axios.get('/felunbo.json').then((res) => {
      // console.log(res)
      this.fearr = res.data.female.msg
    })
  },
  methods: {
    clickChange: function () {
      this.hotrecommendIndex =
        this.hotrecommendIndex >= 2 ? 0 : this.hotrecommendIndex + 1
      // console.log(this.hotrecommendIndex)
      this.$emit('update:hotrecommendIndex', this.hotrecommendIndex)
    },
    felunboClick: function (id) {
      this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang='less' scoped>
@color: #ff2860;
.bg{
  background-color: #f0f0f0;
  height: 10px;
}
.total {
  background-color: #fff;
  margin-top: 10px;
}
div {
  text-align: left;
  header {
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    background-color: @color;
    position: relative;
    overflow: auto;
    zoom: 1;
    // a {
    //   height: 100%;
    //   width: 40px;
    //   display: inline-block;
    //   background-color: red;
    // }
    a.arrow_left {
      left: 0px;
      top: 0px;
      height: 100%;
      width: 40px;

      position: absolute;

      span {
        display: inline-block;
        background: url('../image/icon.png') no-repeat -87px -2px;
        background-size: 150px 280px;
        width: 11px;
        height: 17px;
        margin-left: 14px;
        margin-top: 13px;
      }
    }
    h2 {
      display: inline-block;
      height: 44px;
      font-size: 17px;
      line-height: 44px;
      color: white;
      margin-left: 40px;
    }
    .user {
      height: 44px;
      // display: inline-block;
      width: 40px;
      float: right;
      // background-color: red;
      span {
        background: url('../image/icon.png') no-repeat -3px -3px;
        background-size: 150px 280px;
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-left: 12px;
        margin-top: 14px;
      }
    }
  }
}

.my-swipe .van-swipe-item {
  // padding-top: 30px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #fff;
  font-size:0px;
img{
  width: 100%;
  height:100%;
}
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