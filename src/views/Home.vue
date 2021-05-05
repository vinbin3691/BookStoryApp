<template>
  <div class="home">
    <!-- 搜索框 -->
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" /> -->
    <!-- 关键词 -->
    <van-swipe class="my-swipe" indicator-color="white" :autoplay="2000">
      <van-swipe-item v-for="(item,index) in souyearr" :key="index" @click="souyeClick(item._id)">
     <img :src="item.img" alt />
      </van-swipe-item>
      <!-- <van-swipe-item>
        <img src="../image/lunbo_02.png" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../image/lunbo_03.png" />
      </van-swipe-item> -->
    </van-swipe>
    <!-- 热门搜索组件 -->
    <hotRecommend></hotRecommend>
    <!-- 男频搜索组件 -->
    <maleRecommend></maleRecommend>
    <!-- 女频搜索组件 -->
    <femaleRecommend></femaleRecommend>
    <!-- 会员点击榜单 -->
    <VIP></VIP>
    <!-- 鲜花版/新书版 -->
    <newBook></newBook>
  </div>
</template>

<script>
import hotRecommend from '@/components/hotRecommend.vue'
import maleRecommend from '@/components/maleRecommend.vue'
import femaleRecommend from '@/components/femaleRecommend.vue'
import VIP from '@/components/VIP.vue'
import newBook from '@/components/newBook.vue'




export default {
  components: {
    hotRecommend,
    maleRecommend,
    femaleRecommend,
    VIP,
    newBook
  },
  data: function () {
    return {
      value: '',
      souyearr:[],
    }
  },
  created(){
      this.axios.get('/felunbo.json').then((res) => {
      console.log(res)
      this.souyearr = res.data.souye.msg
    })
  },
  methods:{
    souyeClick:function(id) {
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

@color: #f26552;
// 轮播
.my-swipe .van-swipe-item {
  padding-top: 30px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #fff;
  font-size:0px;
  // height: 130px;
  img {
    width: 100%;
    height:100%;
  }
}
</style>

