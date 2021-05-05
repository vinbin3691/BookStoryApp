<template>
  <div>
    <ul class="novel-list" v-if='currentRecommends'>
      <li v-for="(item,index) in  currentRecommends" :key="index"  @click="femalehotClick(item._id)">
        <a>
          <div >
            <img :src="` http://statics.zhuishushenqi.com${item.cover} `"   />
          </div>
          <h3>{{item.title}}</h3>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['hotrecommendIndex'],
  data: function () {
    return {
      Img: [],
      myitem: [],
     
    }
  },
  created() {
    //   拿到热门推荐的id
    // this.axios
    //   .get('http://novel.kele8.cn/rank/54d43437d47d13ff21cad58b')
    //   // .get('/api/ranking/54d43437d47d13ff21cad58b')
    //   .then((res) => {
    //     var hotId = res.data.ranking.books
    //     // console.log(hotId)
    //     hotId = hotId.slice(0, 18)
    //     hotId.forEach((item) => {
    //       this.axios

    //         .get('http://novel.kele8.cn/book-info/' + item._id)
    //         .then((res) => {
    //           // console.log(res)
    //           this.item = res.data
    //           this.myitem.push(this.item)
    //           //   this.Img.push(item.cover)
    //         })
    //     })
    //   })
 this.axios
      .get('/api/ranking/54d43437d47d13ff21cad58b')

      .then((res) => {
        var hotId = (res.data.ranking.books).slice(0.18)
        this.myitem=hotId;

      })

  },
  computed: {
    currentRecommends: function () {
      return this.myitem.slice(
        this.hotrecommendIndex * 6,
        (this.hotrecommendIndex + 1) * 6
      )
    },
  },
  methods:{
    femalehotClick:function (id) {
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

<style scoped lang='less'>
.novel-list {
  width: 90%;
  margin: 0 auto;
  li {
    width: 29%;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    margin-bottom: 15px;
    margin-top: 15px;
    &:nth-of-type(3n + 2) {
      margin-right: 15px;
      margin-left: 15px;
    }
    // background-color: skyblue;
    a {
      // background-color: skyblue;

      //   width: 30%;
      //   height: 110px;
      //   display: inline-block;
      div {
        img {
          height: 114px;
          width: 86px;
        }
      }
      h3 {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #333;
      }
    }
  }
}
</style>
