<template>
  <div class="recomendlist">

      <ul v-if='currentRecommends'>
      <li
        v-for="(item,index) in currentRecommends"
        :key="index"
        @click.prevent="hotdetaillist(item._id)"
      >

        <a >
          <div class="book_img">
            <img :src="` http://statics.zhuishushenqi.com${item.cover} `" />
          </div>
          <div class="msg">
            <h3>{{item.title}}</h3>
            <p class="aut">{{item.author}}</p>
            <p class="short">{{item.shortIntro}}</p>
          </div>
        </a>
      </li>
    </ul>

    
  </div>
</template>

<script>


export default {
  props: ['hotrecommendIndex', 'femalhot'],
  data: function () {
    return {
      hotlistid: [],
      itemlist: [], //书籍图片
      show: false,
      // hotrecommendIndex: 0,
    }
  },

  created() {
    //   拿到热门推荐的id
    if (this.femalhot) {
      this.axios
        .get('/api/ranking/54d43437d47d13ff21cad58b')
              // .get('http://novel.kele8.cn/rank/54d43437d47d13ff21cad58b')
        .then((res) => {
          var hotId = res.data.ranking.books
          hotId = hotId.slice(0, 9)
          this.itemlist=hotId;
                this.show = true

          // hotId.forEach((item) => {
          //   this.axios
          //     .get('/api/book/' + item._id)
          //     .then((res) => {
          //       this.item = res.data
          //       this.hotlistid.push(item._id)
          //       this.itemlist.push(item)
          //       this.show = true
          //     })
          // })
        })
    } else {
      this.axios
        .get('/api/ranking/5a39d435fc84c2b8ef884798')
              // .get('http://novel.kele8.cn/rank/5a39d435fc84c2b8ef884798')

        .then((res) => {
          var hotId = (res.data.ranking.books).slice(0,9)
          this.itemlist=hotId;
          // hotId = hotId.slice(0, 9)
          // hotId.forEach((item) => {
          //   //   console.log(item._id, index)
          //   // 拿到书籍详情
          //   this.axios
          //     .get('/api/book/' + item._id)
          //     .then((res) => {
          //       // console.log('res=>', res)
          //       this.item = res.data
          //       // console.log(this.item)
          //       this.hotlistid.push(item._id)
          //       // this.itemlist.push(item.cover)
          //       this.itemlist.push(item)

          //       // console.log('  this.itemlist', this.itemlist)
                this.show = true
          //     })
          // })
        })
    }
  },
  methods: {
    hotdetaillist: function (id) {
      // console.log(id)
      this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    },
  },
  watch: {
    // actived(){
    //   this.hotrecommendIndex=this.hotrecommendIndex>2?0:this.hotrecommendIndex+1
    // }
  },
  computed: {
    currentRecommends: function () {
      return this.itemlist.slice(
        this.hotrecommendIndex * 3,
        (this.hotrecommendIndex + 1) * 3
      )
    },
  },
}
</script>

<style  scoped lang='less'>
.recomendlist {
  background: white;
  text-align: left;

  ul {
    li {
      //   float: left;
      height: 116px;
      width: 90%;
      margin: 10px auto;
      // padding-left: 10px;
      overflow: hidden;
      a {
        height: 100%;
        display: flex;
        .book_img {
          flex: 3;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 90px;
            width: 70px;
          }
        }
        .msg {
          margin-top: 13px;
          height: 90px;
          flex: 7;
          // height:100%;
          // background-color: skyblue;
          overflow: hidden;
          text-overflow: ellipsis;
          // white-space: nowrap;
          // float: right;
          h3 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
            color: #333;
            font-size: 15px;
          }
          p.aut {
            margin: 6px 0;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 13px;
            color: #999;
          }
          p.short {
            // height: 47px;
            font-size: 13px;
            text-overflow: -o-ellipsis-lastline;
            color: #999;
            margin: 6px 0;
            overflow: hidden;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            // white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>