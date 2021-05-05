<template>
  <div v-if='Potential'>
    <header>
      <a  class="arrow_left" @click="$router.go(-1)">
        <span></span>
      </a>
      <h2>男生频道</h2>

      <a href class="icon">
        <span></span>
      </a>
    </header>
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" /> -->
    <!-- 轮播 -->
    <ul v-if='showcover'>
      <van-swipe class="my-swipe" :autoplay="3000" >
        <li v-for="(item,index) in  Potential" :key="index" @click='malelunboClick(item._id)'>
          <van-swipe-item>
            <!-- <img :src="` http://statics.zhuishushenqi.com${item.cover} `" /> -->
     <img :src="item.img" alt />

          </van-swipe-item>
        </li>
      </van-swipe>
    </ul>
    <!-- 热门推荐 -->
    <div class="total">
      <!-- <div class="bg"></div> -->
      <div class="reommendTitle">
        
        <h2 class="left">
          <i></i>
          <span>热门推荐</span>
        </h2>
      </div>
      <!-- 热门推荐组件 -->
      <sonMalelist ></sonMalelist>
    </div>

    <!-- 火爆热销组件 -->
    <div class="bg"></div>
    <sonmalexiao></sonmalexiao>

    <!-- 新书推荐 -->
    <div class="total">
      <div class="bg"></div>
      <div class="reommendTitle">
        <h2 class="left">
          <i></i>
          <span>新书推荐</span>
        </h2>
      </div>

      <!-- 新书推荐组件 -->
      <sonMalelist :malenewbook="malenewbook"></sonMalelist>

      <!-- 销售榜 -->
      
      <div class="total"> 
        <div class="bg"></div>
        <div class="reommendTitle">
          <h2 class="left">
            <i></i>
            <span>销售榜</span>
          </h2>
        </div>
      </div>

      <!-- 销售榜组件 -->
      <viplist :malexiaoshou='ab'></viplist>
    </div>
  </div>
</template>

<script>
import sonMalelist from '@/components/sonMalelist.vue'
import sonmalexiao from '@/components/sonmalexiao.vue'
// import Viplist from '@/components/viplist.vue'
import viplist from '@/components/viplist.vue'

export default {
  components: {
    sonMalelist,
    sonmalexiao,
    viplist,
  },
  computed: {
   ab() {
      return this.$store.state.ab
    },
    malenewbook(){
      return this.$store.state.malenewbook

    }
  },
  data: function () {
    return {
      value: '',
      Potential: [],
      showcover:false,
      // malenewbook: true,
    }
  },
  created() {
    // this.axios
    //   .get('http://novel.kele8.cn/rank/54d42e72d9de23382e6877fb')
    //   .then((res) => {
    //     var books = res.data.ranking.books
    //     this.Potential = books.slice(0, 4)
    //     this.showcover=true;
    //   })

        this.axios.get('/felunbo.json').then((res) => {
      console.log(res)
      this.Potential = res.data.souye.msg;
      this.showcover=true;
    })
  },
  methods:{
    malelunboClick:function(id) {
      this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    }
  }
}
</script>

<style lang='less' scoped>
@color: #3498db;
.bg{
  height: 10px;
  background-color: #f0f0f0;
}
.total {
  margin-top: 10px;
  background-color: white;
}
.reommendTitle {
  padding: 10px 12px 10px 0;

 background-color: white;
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
}

.my-swipe .van-swipe-item {
  // padding-top: 30px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #fff;
  font-size:0px;

  img {
    width:100%;
height:100%;
    // height: 160px;
    // object-fit: cover;
  }
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
</style>