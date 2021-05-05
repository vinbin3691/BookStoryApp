<template>
  <div class="mysonmale">
    <ul class="malerem" v-if="showmaleImg">
      <li @click.prevent="sonmalehotClick(malehotbook[0]._id)">
        <a>
          <div class="maleImg">
            <img :src="` http://statics.zhuishushenqi.com${malehotbook[0].cover} `" />
          </div>
          <div class="maleMsg">
            <h3>{{malehotbook[0].title}}</h3>
            <p class="author">{{malehotbook[0].author}}</p>
            <p class="text">{{malehotbook[0].shortIntro}}</p>
          </div>
        </a>
      </li>
      <li
        v-for="(listitem,index) in  hotmalelist"
        :key="index"
        @click.prevent="sonmalehotClick(listitem._id)"
      >
        <a>
          <h3>
            <span class="leftMsg">{{listitem.title}}</span>
            <span class="rightMsg">{{listitem.majorCate}}</span>
          </h3>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['malenewbook','feqianli'],
  data: function () {
    return {
      malehotbook: [],
      showmaleImg: false,
    }
  },
  created() {
    if (this.feqianli) {
      this.axios
        // .get('http://novel.kele8.cn/rank/54d43709fd6ec9ae04184aa5')
      .get('/api/ranking/54d43709fd6ec9ae04184aa5').then((res) => {
          console.log(res)
          var books = res.data.ranking.books
          this.malehotbook = books.slice(0, 6)
          this.showmaleImg = true
        })
    } else {
      this.axios
        // .get('http://novel.kele8.cn/rank/5a684515fc84c2b8efaa9875')
      .get('/api/ranking/5a684515fc84c2b8efaa9875').then((res) => {
          // console.log(res)
          var books = res.data.ranking.books
          this.malehotbook = books.slice(0, 6)
          this.showmaleImg = true
        })
    }
  },
  computed: {
    hotmalelist: function () {
      return this.malehotbook.slice(1, this.malehotbook.length)
    },
  },
  methods: {
    sonmalehotClick: function (id) {
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
.mysonmale {
  background-color: white;
}
.bg {
  width: 100%;
  height: 10px;
  background: #f0f0f0;
}
div {
  //   background-color: red;
  ul.malerem {
    width: 90%;
    margin: 0 auto;
    li:first-child {
      a {
        display: block;
        height: 94px;
        overflow: auto;
        zoom: 1;
        div.maleImg {
          margin-left: 0px;
          width: 70px;
          height: 94px;
          float: left;
        }
        div.maleMsg {
          padding-left: 80px;
          h3 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
            color: #333;
            font-size: 15px;
          }
          p.author {
            margin: 6px 0;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 13px;
            color: #999;
          }
          P.text {
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
    li {
      padding: 8px 0px;
      a {
        h3 {
          .leftMsg {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            color: black;
            display: inline-block;
          }
          .rightMsg {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            color: #999;
            float: right;
          }
        }
      }
    }
  }
}
</style>