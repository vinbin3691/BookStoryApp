
<template>
  <div>
    <div>
      <!-- 头部 -->

      <van-popup
        :lock-scroll="false"
        :overlay="false"
        v-model="paused"
        position="top"
        :style="{ height: '50px'}"
        :class="{noveltop:view,noveldefault:!view}"
      >
        <a class="arrow_left" @click="arrowClick">
          <span></span>
        </a>
        <a href class="user">
          <span></span>
        </a>
      </van-popup>

      <!-- 小说内容 -->
      <van-cell is-link close-icon v-if="chapters" @click="msg" :class="{active:view}">
        <p class="numtitle" v-if="index">{{chapters[index].title}}</p>
        <p class="numtitle" v-show="!index">{{chapters[0].title}}</p>

        <div class="context">
          <p
            v-for="(passage,index) in myarr[index]"
            :key="index"
            :style=" `fontSize:${font}px` "
            class="passage"
          >{{passage}}</p>
        </div>
        <div class="context" v-if="!index">
          <p v-for="(passage,index) in myarr[0]" :key="index" class="passage">{{passage}}</p>
        </div>
      </van-cell>
      <!-- 小说章节 -->

      <van-popup v-model="show" position="left" :style="{width: '70%',height:'100%'}">
        <div :class="{nightsession:view}" v-if="chapters">
          <p class="title" v-if="length">共{{length}}章</p>
          <p
            v-for="(item,index) in chapters"
            :key="index"
            class="arow"
            @click="clickArow(index,id)"
          >{{item.title}}</p>
          <!-- http://vip.zhuishushenqi.com/chapter/59ce2864f452e8d57c6e9406?cv=1560301666719 -->
          <!-- "http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F59ce2864f452e8d57c6e9406%3Fcv%3D1560301666719" -->
        </div>

        <div class="loading">请稍等......</div>
      </van-popup>

      <!-- 小说底部 -->

      <van-popup
        :lock-scroll="false"
        :overlay="false"
        v-model="paused"
        position="bottom"
        :style="{ height: '108px'}"
        :class="{footerdefault:!view,novelfooter:view}"
      >
        <footer>
          <div class="top">
            <span class="pre" @click="clickSessionprev">上一章</span>
            <div class="middle">
              <div></div>
            </div>
            <span class="next" @click="clickSessionNext">下一章</span>
          </div>
          <div class="bottom">
            <ul>
              <li @click="souroot">
                <p>
                  <s class="icon1"></s>
                </p>
                <span class="text">首页</span>
              </li>
              <li @click="showsession">
                <p>
                  <s class="icon2"></s>
                </p>
                <span class="text">目录</span>
              </li>

              <li @click="nightclick">
                <p>
                  <s class="icon3"></s>
                </p>
                <span class="text">夜间</span>
              </li>

              <li @click="$store.commit('add')">
                <p>
                  <s class="icon4"></s>
                </p>
                <span class="text">字体</span>
              </li>
              <li @click="$store.commit('reduce')">
                <p>
                  <s class="icon5"></s>
                </p>
                <span class="text">字体</span>
              </li>
            </ul>
          </div>
        </footer>
      </van-popup>
    </div>
  </div>
</template>

<script>
// import detailheader from '@/components/detailheader.vue'

export default {
  //   components:{
  // detailheader,
  //   },
  data() {
    return {
      view: false,
      show: false,
      id: null,
      length: null,
      chapters: null,
      index: 0,
      myarr: [],
      totalarr: [],
      paused: false,
      lo: {
        index: '',
        id: '',
      },
    }
  },

  created() {
    this.show = true
    this.id = this.$route.query.id
    this.axios
      .get('http://novel.kele8.cn/book-sources?view=summary&book=' + this.id)
      .then((res) => {
        // console.log('res=>', res)
        let zhanjieid = res.data[0]._id
        // console.log(zhanjieid)
        this.axios
          .get('http://novel.kele8.cn/book-chapters/' + zhanjieid)
          .then((res) => {
            // console.log('章节=>', res)
            this.chapters = res.data.chapters
            // console.log(res.data.chapters[0].isVip)
            // console.log('this.chapters', this.chapters)
            this.length = res.data.chapters.length

            // 编码：
            res.data.chapters.slice(0, 10).forEach((item) => {
              let mylink = encodeURIComponent(item.link)
              this.axios
                .get('http://novel.kele8.cn/chapters/' + mylink)
                .then((res) => {
                  // console.log('内容', res)

                  var str = res.data.chapter.cpContent.split('\n')
                  str = str.slice(1, str.length)
                  this.myarr.push(str)
                  this.totalarr.push(this.myarr)
                })
            })
          })
      })
    if (
     
      this.id == window.localStorage.getItem('lo.id')
    ) {
      this.index = window.localStorage.getItem('lo.index')
    }else{
      this.index = 0

    }
  },
  watch: {
    index: function (n) {
      // console.log(n,o)

      window.localStorage.setItem('lo.index', n)
      window.localStorage.setItem('lo.id', this.id)

      this.$router.push({
        name: 'detail',
        query: {
          id: this.id,
          num: n,
        },
      })
    },
  },
  computed: {
    mypaused: function () {
      return this.$store.state.mypaused
    },
    font: function () {
      return this.$store.state.font
    },
  },
  methods: {
    clickSessionprev: function () {
      if (this.index > 0) {
        this.index--
      } else {
        this.index = 0
      }
    },
    clickSessionNext: function () {
      console.log('下一章')
      if (this.index < this.length) {
        this.index++
      } else {
        this.index = this.length
      }
    },
    souroot: function () {
      this.$router.push({
        path: '/',
      })
    },
    showsession: function () {
      this.show = !this.show
    },
    nightclick: function () {
      this.view = !this.view
      // console.log(this.view)
    },
    arrowClick: function (id) {
      // console.log('xxx')
      this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    },
    clickArow: function (index) {
      this.index = index
    },
    msg: function () {
      this.paused = !this.paused
    },
  },
}
</script>

<style lang='less' scoped>
.loading {
  text-align: center;
  margin-top: 300px;
  // line-height: 300px;
}
p.numtitle {
  font-size: 30px !important;
  word-spacing: 10px;
  line-height: 1.5;
}
.noveldefault {
  a.arrow_left {
    left: 0px;
    top: 0px;
    height: 100%;
    width: 40px;

    position: absolute;

    span {
      display: inline-block;
      margin-top: 16px;

      background: url('../image/icons2.png') no-repeat 0 -33px;
      background-size: 300px 400px;
      width: 11px;
      height: 18px;
    }
  }

  .user {
    height: 44px;
    // display: inline-block;
    width: 40px;
    float: right;

    span {
      display: inline-block;
      margin-right: 16px;
      margin-top: 16px;

      background: url('../image/icons2.png') no-repeat -235px -115px;
      background-size: 300px 400px;
      width: 15px;
      height: 18px;
    }
  }
}

.van-icon-arrow::before {
  content: '';
}
.context {
  padding: 0px;
}
.title {
  font-size: 18px;
  letter-spacing: 0.64px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  text-align: left;
  padding-left: 8%;
  padding-top: 20px;
  margin: 0 0 12px 0;
}
.arow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #263036;
  text-align: left;
  padding-left: 8%;
  // padding-top: 20px;
  margin: 0 0 12px 0;
  max-width: 82%;
  letter-spacing: 0.64px;
}
.passage {
  text-indent: 1em;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 16px;
  word-spacing: 10px;
  line-height: 1.5;
  // margin:0 0 12px;
  color: #263036;
}
.footerdefault {
  footer {
    .top {
      width: 90%;
      margin: 0 auto;
      padding: 10px 0 20px 0px;
      display: flex;
      span.pre {
        float: left;
        color: #333;
      }
      span.next {
        float: right;
        color: #333;
      }
      div.middle {
        flex: 1;
        position: relative;
        div {
          height: 3px;
          background-color: #ccc;
          position: absolute;
          top: 50%;
          width: 100%;
        }
      }
    }
    .bottom {
      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          height: 57px;
          flex: 1;
          p {
            height: 30px;
            line-height: 30px;
            s.icon1 {
              background: url('../image/icons2.png') no-repeat -198px -30px;
              background-size: 300px 400px;
              width: 24px;
              height: 24px;
              display: inline-block;
            }
            s.icon2 {
              background: url('../image/icons2.png') no-repeat -239px -30px;
              background-size: 300px 400px;
              width: 26px;
              height: 20px;
              display: inline-block;
            }
            s.icon3 {
              background: url('../image/icons2.png') no-repeat -275px -30px;
              background-size: 300px 400px;
              width: 24px;
              height: 24px;
              display: inline-block;
            }
            s.icon4 {
              background: url('../image/icons2.png') no-repeat -60px -57px;
              background-size: 300px 400px;
              width: 21px;
              height: 21px;
              display: inline-block;
            }
            s.icon5 {
              background: url('../image/icons2.png') no-repeat -24px -58px;
              background-size: 300px 400px;
              width: 21px;
              height: 18px;
              display: inline-block;
            }
          }
          .text {
            padding: 5px;
          }
        }
      }
    }
  }
}

// ==================================夜间模式
// 小说头部
.noveltop {
  background-color: #333;
  .arrow_left {
    left: 0px;
    top: 0px;
    height: 100%;
    width: 40px;

    position: absolute;

    span {
      background: url('../image/icons2.png') no-repeat 0 -58px;
      background-size: 300px 400px;
      width: 11px;
      height: 18px;
      display: inline-block;
      margin-top: 16px;
    }
  }
  .user {
    height: 44px;
    // display: inline-block;
    width: 40px;
    float: right;

    span {
      display: inline-block;
      margin-right: 16px;
      margin-top: 16px;

      background: url('../image/icon.png') no-repeat -3px -3px;
      background-size: 150px 280px;
      width: 15px;
      height: 18px;
    }
  }
}
// 小说内容
.active {
  background-color: black !important;
  color: white;
  p.numtitle {
    color: #c0c0c0 !important;
  }
  p.passage {
    color: #c0c0c0 !important;
  }
}
.van-cell {
  background-color: #f4f4f4;
  // background-color: red;

  .numtitle {
    text-align: center;
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
// 小说尾部
.novelfooter {
  background-color: #333;
  footer {
    .top {
      width: 90%;
      margin: 0 auto;
      padding: 10px 0 20px 0px;
      display: flex;
      span.pre {
        float: left;
        color: #c1c1c1;
      }
      span.next {
        float: right;
        color: #c1c1c1;
      }
      div.middle {
        flex: 1;
        position: relative;
        div {
          height: 3px;
          background-color: #f1f1f1;
          position: absolute;
          top: 50%;
          width: 100%;
        }
      }
    }
    .bottom {
      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          height: 57px;
          flex: 1;
          p {
            height: 30px;
            line-height: 30px;
            s.icon1 {
              background: url('../image/icons2.png') no-repeat -198px -65px;
              background-size: 300px 400px;
              width: 24px;
              height: 24px;
              display: inline-block;
            }
            s.icon2 {
              background: url('../image/icons2.png') no-repeat -239px -65px;
              background-size: 300px 400px;
              width: 26px;
              height: 20px;
              display: inline-block;
            }
            s.icon3 {
              background: url('../image/icons2.png') no-repeat -275px -65px;
              background-size: 300px 400px;
              width: 24px;
              height: 24px;
              display: inline-block;
            }
            s.icon4 {
              background: url('../image/icons2.png') no-repeat -60px -82px;
              background-size: 300px 400px;
              width: 21px;
              height: 21px;
              display: inline-block;
            }
            s.icon5 {
              background: url('../image/icons2.png') no-repeat -24px -84px;
              background-size: 300px 400px;
              width: 21px;
              height: 18px;
              display: inline-block;
            }
          }
          .text {
            padding: 5px;
            color: #f7f7f7;
          }
        }
      }
    }
  }
}

// 章节列表
.nightsession {
  background-color: #333 !important;
  .title {
    color: #fff;
  }
  .arow {
    color: #c0c0c0;
  }
}
</style>

