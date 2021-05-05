<template>
  <div>
    <div v-if="this.$route.name=='detaillist'&&this.reviews.length>0&&recommendbook.length>0">
      <header v-if="compshow">
        <a class="arrow_left" @click="arrow_leftClick">
          <span></span>
        </a>
        <h2>{{detaildata.title}}</h2>

        <a href class="user">
          <span></span>
        </a>
      </header>
      <section>
        <div class="box">
          <div class="mask" :style="{backgroundImage:`url(${ url})`}"></div>
          <img alt :src="url" />
          <div class="textright">
            <p>{{detaildata.title}}</p>
            <span class="aut">作者：{{detaildata.author}}</span>
            <span class="wordcount">字数：{{detaildata.wordCount|format('万')}}</span>
            <div class="tag">
              <span v-for="(item,index) in arrtags" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="btn">
        <button class="join" @click="joinShou(id)" v-if="clickjoin">加入收藏</button>
        <button class="join" :class="{'joinclick':!clickjoin}" @click="removeShou(id)" v-else>移除收藏</button>
        <button class="read" @click="clickArow(id,num)">立即阅读</button>
      </div>

      <div class="book">
        <div class="bookintro">
          <h3>书籍简介</h3>
          <p class="intro">{{ longIntro}}</p>
          <div class="trantext" @click="clickTranText">
            <div v-if="zhankai">
              <span class="tran"></span>
              <span class="text">展开</span>
            </div>
            <div v-if="!zhankai">
              <span class="shoutran"></span>
              <span class="shoutext">收起</span>
            </div>
          </div>
        </div>
        <div class="root" @click="clickRoot(id,num)">
          <span class="rooticon"></span>
          <span>目录</span>
          <!-- <span  class="updatedata"  v-if='detaildata.updated!="undefined"'>更新于{{detaildata.updated|updatezhanjie}}</span> -->
        </div>
      </div>

      <!--http://api.zhuishushenqi.com/post/review/by-book?book=51060c88bb1c67cf28000035&sort=updated  -->
      <!-- 书籍评论 -->
      <div class="comment">
        <div>
          <p>
            <span>书籍评论</span>
            <a class="writecomment" @click="writecommentClick(id)">写评论</a>
          </p>
          <div class="commentlist">
            <ul>
              <li v-for="(myreview,index) in reviews" :key="index">
                <img :src="`http://statics.zhuishushenqi.com${myreview.author.avatar}`" />
                <div>
                  <p class="comment-author">
                    <span class="autor_name">{{myreview.author.nickname}}</span>
                    <span class="gread gread_lv">LV{{myreview.author.lv}}</span>
                    <!-- <span class="gread gread_vip">高级</span> -->
                    <span class="gread gread_status">见习</span>
                  </p>
                  <p class="comment-content">{{myreview.title}}</p>
                  <p>
                    <span class="when-comment">{{myreview.updated|formatdate}}</span>
                    <span class="commentimg">
                      <span class="icon"></span>
                      <span class="text">{{myreview.likeCount}}</span>
                    </span>
                  </p>
                </div>
              </li>
              <a class="more" v-if="reviewslength">
                <p @click.prevent="commentmoreClick(id)">查看更多评论({{reviewslength}})</p>
              </a>
            </ul>
          </div>
        </div>
      </div>
      <!-- 相关推荐 -->
      <!-- http://novel.kele8.cn/recommend/55da61aa40851fec3851bc56 -->
      <div class="relativerecomd" v-if="recommendbook.length!=0">
        <div>
          <h3>相关推荐</h3>
          <van-swipe :loop="false" :width="90" :show-indicators="false">
            <van-swipe-item
              v-for="(myitem,index) in recommendbook"
              :key="index"
              @click="clickRecommendbook(myitem)"
            >
              <img :src="` http://statics.zhuishushenqi.com${myitem.cover} `" alt />
              <span>{{myitem.author}}</span>
            </van-swipe-item>
            <van-swipe-item></van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>

    <div class="loading" v-if="recommendbook.length==0">
      <van-loading size="48px" text-size="18px">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'

export default {
  data: function () {
    return {
      clickjoin: true,
      id: null,
      detaildata: '',
      compshow: false,
      url: '',
      arrtags: '',
      longIntro: '',
      zhankai: true,
      recommendbook: [],
      recommendId: null,
      reviews: [],
      reviewslength: null,
      num: 0,
      isBigVip: false,
      shoucan: [],
    }
  },

  filters: {
    format: function (a, b) {
      return (a / 10000).toFixed(2) + b
    },
    formatdate: function (a) {
      return a.slice(0, 10)
    },
    updatezhanjie: function (a) {
      console.log('a=>', a)
    },
  },
  created() {
    this.id = this.$route.query.id
    // http://novel.kele8.cn/book-info/5953714a528d4b0616217012
    this.fun()
    if (window.localStorage.shoucan) {
      this.shoucan = JSON.parse(localStorage.getItem('shoucan'))
      if (this.shoucan.indexOf(this.id) != -1) {
        // console.log('已经添加')
        this.clickjoin = false
      } else {
        this.clickjoin = true
      }
    }
  },
  watch: {
    recommendId: function (n) {
      this.detaildata = n
      this.id = n._id
      this.$router.push({
        path: '/detaillist',
        query: {
          id: this.id,
        },
      })

      // this.detaildata=n;
      // console.log(this.detaildata)
      this.$router.go(0)
    },
    reviewslength: function (n) {
      // console.log(n)
      this.reviewslength = n
    },
  },
  activated: function () {
    // this.$router.go(0)

    // console.log(' activated')
    this.id = this.$route.query.id
    this.fun()
    if (this.shoucan.indexOf(this.id) == -1) {
      // console.log('新添加')
      this.clickjoin = true
    } else {
      this.clickjoin = false
    }
  },
  methods: {
    fun: function () {
      if (this.id != null) {
        this.axios.get('/api/book/' + this.id).then((res) => {
          this.detaildata = res.data
          // console.log(res)
          if (this.detaildata.longIntro) {
            this.longIntro = this.detaildata.longIntro.replace(/\s/g, '')
          }

          this.url = 'http://statics.zhuishushenqi.com' + res.data.cover
          this.compshow = true
          // console.log('res.data.tags=>', res.data.tags)

          if (res.data.tags) {
            this.arrtags = res.data.tags.slice(0, 3)
          }
          if (res.data.isBigVip == true) {
            this.isBigVip = true
          } else {
            this.isBigVip = false
          }
        })
        // 拿书籍评论
        // if (localStorage.length > 2) {
        //   this.reviews = JSON.parse(localStorage.getItem('key'))
        //   let a = this.reviews.length
        //   this.reviewslength = a

        //   // console.log(this.reviewslength)

        //   if (this.reviews.length >= 3) {
        //     this.reviews = this.reviews.slice(0, 3)
        //     // console.log(this.reviews)
        //   }

        // } else {
          this.axios
            .get('/api/post/review/by-book?book=' + this.id + '&sort=updated')
            .then((res) => {
              // console.log('书籍评论=>', res)
              this.reviewslength = res.data.total
              if (this.reviewslength >= 3) {
                this.reviews = res.data.reviews.slice(0, 3)
                // console.log(this.reviews)
              }
            })
        // }
        this.axios
          .get('http://novel.kele8.cn/recommend/' + this.id)
          .then((res) => {
            this.recommendbook = res.data.books
          })
      }
    },
    joinShou: function (id) {
      console.log('加入收藏id', id)
      if (this.shoucan.indexOf(id) == -1) {
        this.shoucan.push(id)
        localStorage.setItem('shoucan', JSON.stringify(this.shoucan))
        this.clickjoin = !this.clickjoin
      }

      //  console.log(  typeof   JSON.parse(localStorage.getItem('shoucan')) )
      // console.log(this.shoucan)
    },
    removeShou: function (id) {
      console.log('移除id', id)
      this.shoucan = this.shoucan.filter((item) => {
        return item !== id
      })
      localStorage.setItem('shoucan', JSON.stringify(this.shoucan))
      this.clickjoin = !this.clickjoin
    },
    arrow_leftClick: function () {
      this.$router.push({
        path: '/',
      })
      // this.$router.go(-1)
    },
    clickTranText: function () {
      this.zhankai = !this.zhankai
      if (this.zhankai == false) {
        document.querySelector('.intro').style.webkitLineClamp = 'unset'
      } else {
        document.querySelector('.intro').style.webkitLineClamp = '2'
      }
    },
    clickRoot: function (id, num) {
      if (this.isBigVip == true) {
        this.$router.push({
          name: 'detail',
          query: {
            id,
            num: num,
          },
        })
      } else {
        Dialog({ message: '该书籍为会员专享,请充值后进行阅读' })
      }
    },
    clickRecommendbook: function (myitem) {
      this.recommendId = myitem
    },
    clickArow: function (id, num) {
      if (this.isBigVip == true) {
        this.$router.push({
          name: 'detail',
          query: {
            id,
            num: num,
          },
        })
      } else {
        Dialog({ message: '该书籍为会员专享,请充值阅读本作品' })
      }
    },
    writecommentClick: function (id) {
      this.$router.push({
        path: '/comment',
        query: {
          id,
        },
      })
    },

    commentmoreClick: function (id) {
      this.$router.push({
        path: '/comment',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang='less' scoped>
.van-loading {
  text-align: center;
  width: 100%;
}
.joinclick {
  background-color: #f26552 !important;
  color: white !important;
  border: 0px !important;
}
.van-swipe {
  width: 100%;
  // background-color: skyblue;
  .van-swipe-item {
    width: 100%;
    height: 136px;
    margin-right: 5px;

    img {
      height: 92px;
    }
    span {
      font-size: 12px;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      // white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
    }
  }
}
.loading {
  height: 300px;
  line-height: 300px;
  // padding-top: 300px;
  text-align: center;
}
div {
  text-align: left;
  header {
    display: flex;
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    background-color: #ffffff;
    position: relative;
    overflow: auto;
    zoom: 1;
    a.arrow_left {
      left: 0px;
      top: 0px;
      height: 100%;
      width: 40px;

      position: absolute;

      span {
        display: inline-block;
        background: url('../image/icons2.png') no-repeat 0px -33px;
        // background-size: 150px 280px;
        width: 11px;
        height: 17px;
        margin-left: 14px;
        margin-top: 13px;

        // background: url('imgs/icons2.png') no-repeat 0 -33px;
        background-size: 300px 400px;
        // width: 11px;
        // height: 18px;
      }
    }
    h2 {
      flex: 1;
      display: inline-block;
      height: 44px;
      font-size: 17px;
      line-height: 44px;
      color: #263036;
      margin-left: 40px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .user {
      height: 44px;
      // display: inline-block;
      width: 40px;
      float: right;
      // background-color: red;
      span {
        background: url('../image/icons2.png') no-repeat -235px -115px;
        background-size: 300px 400px;

        display: inline-block;
        margin-left: 12px;
        margin-top: 13px;

        width: 15px;
        height: 18px;
      }
    }
  }
}
.box {
  position: relative;
  overflow: hidden;
  .mask {
    z-index: 1;
    width: 100%;
    height: 168px;
    // background-color: skyblue;
    filter: blur(8px) brightness(0.8);
  }
  img {
    width: 90px;
    height: 120px;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -60px;
    z-index: 999;
    box-sizing: border-box;
  }
  .textright {
    max-width: 65%;

    height: 120px;
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -60px;
    width: 70%;
    p {
      color: white;
      font-weight: bold;
      font-size: 16px;
      padding-bottom: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span.aut,
    span.wordcount {
      font-size: 12px;
      padding-bottom: 10px;
      color: white;
      display: block;
    }
    .tag {
      padding-top: 10px;
      span {
        display: inline-block;
        margin-right: 20px;
        font-size: 12px;
        color: white;
      }
    }
  }
}
.btn {
  height: 68px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .join {
    width: 130px;
    height: 38px;
    background-color: white;

    font-size: 14px;
    vertical-align: center;
    border-radius: 2px;
    border: 0px;
    color: #333;
    border: 1px solid #333;
  }
  .read {
    width: 130px;
    height: 38px;
    background-color: #333;
    color: white;
    font-size: 14px;
    vertical-align: center;
    border-radius: 2px;
    border: 1px solid transparent;
  }
}
.book {
  margin-top: 10px;
  background-color: #fff;
  .bookintro {
    width: 90%;
    margin: 0 auto;
    overflow: auto;
    zoom: 1;
    h3 {
      padding: 10px 0px;
      color: #263036;
      font-weight: 700;
    }
    p {
      // height: 47px;
      font-size: 14px;
      text-overflow: -o-ellipsis-lastline;
      color: #999;
      // margin: 6px 0;
      overflow: hidden;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      // white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
      -webkit-box-orient: vertical;
      letter-spacing: 2px;
    }
    div.trantext {
      margin-bottom: 10px;
      float: right;
      padding-top: 5px;
      span.tran {
        display: inline-block;
        margin-right: 2px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-top: 6px solid black;
      }
      span.text {
        display: inline-block;

        font-size: 12px;
      }
    }

    span.shoutran {
      display: inline-block;
      margin-right: 2px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid transparent;
      border-bottom: 6px solid black;
    }
    span.shoutext {
      display: inline-block;

      font-size: 12px;
    }
  }
  .root {
    margin: 0 auto;
    width: 90%;
    height: 48px;
    line-height: 48px;
    border-top: 1px solid #ccc;

    .rooticon {
      display: inline-block;
      background: url('../image/icons2.png') no-repeat -210px 0;
      background-size: 300px 400px;
      width: 17px;
      height: 13px;
      margin-right: 10px;
    }
    .updatedata {
      float: right;
      font-size: 14px;
      color: #ccc;
    }
  }
}
.relativerecomd {
  margin-top: 10px;
  background-color: #fff;

  div {
    width: 90%;
    margin: 0 auto;
    h3 {
      padding: 10px 0px;
      color: #263036;
      font-weight: 700;
    }
    #wrapper {
      width: 1000px;
      li {
        padding: 0px;
        // margin-right: 10px;
        width: 68px;
        height: 92px;
        display: inline-block;
        background-color: red;
      }
    }
  }
}

// 书籍评论
.comment {
  box-sizing: border-box;
  // width:90%;
  margin-top: 10px;

  background-color: white;
  div {
    margin: 0 auto;
    width: 90%;
    p {
      height: 30px;
      line-height: 30px;
      overflow: auto;
      zoom: 1;
      span {
        font-size: 16px;
      }
      a.writecomment {
        color: rgba(38, 48, 54, 0.5);
        font-size: 14px;
        float: right;
      }
    }
    div.commentlist {
      width: 100%;
      ul {
        li {
          margin-top: 10px;
          padding: 0px;
          display: flex;
          border-bottom: 1px solid #ccc;
          img {
            border-radius: 50%;
            height: 30px;
            width: 30px;
            object-fit: cover;
            margin-right: 8px;
          }
          div {
            flex: 1;
            display: inline-block;
            p.comment-author {
              box-sizing: border-box;
              overflow: hidden;
              zoom: 1;
              .autor_name {
                height: 30%;
                line-height: 30px;
                font-size: 13px;
                font-weight: bolder;
                margin-right: 6px;
                float: left;
              }
              .gread {
                padding: 1px 4px;
                border-radius: 10px;
                font-size: 12px;
                line-height: 12px;
                float: left;
                margin: 7px 6px 0 0;
              }
              .gread_lv {
                border: 1px solid #4d8bee;
                color: #4d8bee;
                // font-size: 12px;
              }
              .gread_vip {
                border: 1px solid #efba4e;
                color: #efba4e;
              }
              .gread_status {
                border: 1px solid #c0c0c0;
                color: #c0c0c0;
              }
            }
            p.comment-content {
              font-size: 14px;
              color: #666;
              letter-spacing: 0.64px;
              // line-height: 60px;
              text-align: left;
              text-align: justify;
              height: auto;
              // line-height: 60px;
            }
            p {
              box-sizing: border-box;
              overflow: auto;
              zoom: 1;
              height: 30px;
              line-height: 30px;
              .when-comment {
                color: #c0c0c0;
                font-size: 12px;
              }
              .commentimg {
                float: right;
                font-size: 12px;
                color: #c0c0c0;
                height: 30px;
                box-sizing: border-box;
                span.icon {
                  background: url('../image/smallicons.png') no-repeat -245px 0;
                  background-size: 300px 400px;
                  width: 14px;
                  height: 14px;
                  display: inline-block;
                  margin-top: 10px;
                }
                span.text {
                  height: 30px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #c0c0c0;
                  margin-left: 5px;
                }
              }
            }
          }
        }
        a.more {
          p {
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #de5a58;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>