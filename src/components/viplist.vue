<template>
  <div>
    <div class="viplist">
      <ul v-if="booksImg">
        <li
          class="fewanjie"
          @click.prevent="viphotClick(books[0]._id)"
          v-show="fewanjie"
        >
          <a>
            <dl>
              <dt>1</dt>
              <dd>
                <div class="img">
                  <img :src="` http://statics.zhuishushenqi.com${books[0].cover} `" />
                </div>
                <div class="msg">
                  <h3>{{books[0].title}}</h3>
                  <p class="aut">{{books[0].author}}</p>
                  <p class="text">{{books[0].shortIntro}}</p>
                </div>
              </dd>
            </dl>
          </a>
        </li>
        <li class="first" @click.prevent="viphotClick(books[0]._id)" v-show="!malexiaoshou&&!fewanjie">
          <a>
            <dl>
              <dt>1</dt>
              <dd>
                <div class="img">
                  <img :src="` http://statics.zhuishushenqi.com${books[0].cover} `" />
                </div>
                <div class="msg">
                  <h3>{{books[0].title}}</h3>
                  <p class="aut">{{books[0].author}}</p>
                  <p class="text">{{books[0].shortIntro}}</p>
                </div>
              </dd>
            </dl>
          </a>
        </li>
        <li class="xsfirst" @click.prevent="viphotClick(books[0]._id)" v-if="malexiaoshou">
          <a>
            <dl>
              <dt>1</dt>
              <dd>
                <div class="img">
                  <img :src="` http://statics.zhuishushenqi.com${books[0].cover} `" />
                </div>
                <div class="msg">
                  <h3>{{books[0].title}}</h3>
                  <p class="aut">{{books[0].author}}</p>
                  <p class="text">{{books[0].shortIntro}}</p>
                </div>
              </dd>
            </dl>
          </a>
        </li>

        <li
          class="lilist"
          v-for="(item,index) in bookslist"
          :key="index"
          @click="viphotClick(item._id)"
        >
          <a href="#">
            <dl>
              <dt :class="arr[index]" v-show="!malexiaoshou&&!fewanjie">{{index+2}}</dt>
              <dt :class="xiaoshou[index]" v-if="malexiaoshou">{{index+2}}</dt>
              <dt v-show="fewanjie " :class="wanjie[index]">{{index+2}}</dt>

              <dd>
                <h3>{{item.title}}</h3>
                <p>{{item.author}}</p>
              </dd>
            </dl>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['renewbook', 'vip', 'malexiaoshou', 'fewanjie'],
  data: function () {
    return {
      books: '',
      booksImg: false,
      arr: ['s1', 's2', 's3', 's4'],
      xiaoshou: ['xs1', 'xs2', 'xs3', 'xs4'],
      wanjie: ['fe1', 'fe2', 'fe3', 'fe4'],
    }
  },
  created() {
    // 首页vip榜
    if (this.vip) {
      this.axios
        // .get('http://novel.kele8.cn/rank/5a683b68fc84c2b8efa68fc2')
      .get('/api/ranking/5a683b68fc84c2b8efa68fc2')
        
        .then((res) => {
          var books = res.data.ranking.books

          this.books = books.slice(0, 5)
          this.booksImg = true
        })
    }
    // 首页鲜花版数据
    if (this.renewbook) {
      this.axios
        // .get('http://novel.kele8.cn/rank/5a39ca3ffc84c2b8ef82da82')
      .get('/api/ranking/5a39ca3ffc84c2b8ef82da82')

        .then((res) => {
          var books = res.data.ranking.books

          this.books = books.slice(0, 5)
          this.booksImg = true
        })
    }

    if (this.malexiaoshou) {
      // 54d430962c12d3740e4a3ed2
      this.axios
      // http://api.zhuishushenqi.com/ranking/:id
      .get('/api/ranking/5a322ef4fc84c2b8efaa8335')
        // .get('http://novel.kele8.cn/rank/5a322ef4fc84c2b8efaa8335')
        .then((res) => {
          var books = res.data.ranking.books

          this.books = books.slice(0, 5)
          this.booksImg = true
        })
    }
    if (this.fewanjie) {
      // 54d430962c12d3740e4a3ed2
      this.axios
      .get('/api/ranking/564eb8a9cf77e9b25056162d')

        // .get('http://novel.kele8.cn/rank/564eb8a9cf77e9b25056162d')
        .then((res) => {
          var books = res.data.ranking.books

          this.books = books.slice(0, 5)
          this.booksImg = true
        })
    }
  },
  computed: {
    bookslist: function () {
      return this.books.slice(1, this.books.length)
    },
  },
  methods: {
    viphotClick: function (id) {
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

<style lang="less" scoped>
.viplist {
  width: 90%;
  margin: 0 auto;
  ul {
    li.first,
    li.xsfirst,
    li.fewanjie {
      padding: 8px 0px;

      a {
        display: block;
        color: #999;
        position: relative;

        dl {
          display: block;
          dt {
            text-align: center;
            background: url('../image/icon.png') no-repeat -68px -27px;
            background-size: 150px 280px;
            width: 18px;
            height: 16px;
            font-size: 12px;
            color: white;
            position: absolute;
            top: 0px;
            left: 0px;
            margin-top: 6px;
            margin-left: 0px;
          }
          dd {
            padding-left: 30px;
            overflow: auto;
            zoom: 1;
            div.img {
              // border: 1px solid #999;
              width: 25%;
              float: left;
              height: auto;
              img {
                width: 100%;
              }
            }
            div.msg {
              text-align: left;
              padding-left: 29%;
              h3 {
                max-width: 100%;
                overflow: hidden;
                font-size: 15px;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
              }
              p.aut {
                margin: 6px 0;
              }
              p.text {
                font-size: 13px;
                text-overflow: -o-ellipsis-lastline;
                color: #999;
                margin: 6px 0;
                overflow: hidden;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
    li.xsfirst {
      a {
        dl {
          dt {
            background: url('../image/icon.png') no-repeat -23px -245px;
            background-size: 150px 280px;
          }
        }
      }
    }

    li.fewanjie {
      a {
        dl {
          dt {
            background: url('../image/icon.png') no-repeat -45px -245px;
            background-size: 150px 280px;
            // width: 150px;
            // height: 34px;
          }
        }
      }
    }
    li.lilist {
      padding: 8px 0px;
      a {
        display: block;
        color: #999;
        position: relative;
        dl {
          dt {
            text-align: center;
            font-size: 12px;
            line-height: 16px;
            color: #fff;
            position: absolute;
            text-align: center;
            top: 0px;
            left: 0px;
            margin-top: 4px;
            margin-left: 0px;
            width: 18px;
            height: 16px;
          }
          dd {
            padding-left: 30px;
            text-align: left;
            box-sizing: border-box;
            overflow: auto;
            zoom: 1;
            h3 {
              max-width: 100%;
              overflow: hidden;
              font-size: 15px;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #333;
              line-height: 24px;
              display: inline-block;
            }
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: right;
              font-size: 13px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}

.s1 {
  background: url('../image/icon.png') no-repeat -92px -27px;
  background-size: 150px 280px;
}
.s2 {
  background: url('../image/icon.png') no-repeat -119px -27px;
  background-size: 150px 280px;
}
.s3 {
  background: url('../image/icon.png') no-repeat 0 -53px;
  background-size: 150px 280px;
}
.s4,
.xs4,
.fe3,
.fe4,
.xs3 {
  background: url('../image/icon.png') no-repeat 0 -53px;
  background-size: 150px 280px;
}

.xs1 {
  background: url('../image/icon.png') no-repeat 0 -245px;
  background-size: 150px 280px;
}
.xs2 {
  background: url('../image/icon.png') no-repeat -119px -27px;
  background-size: 150px 280px;
}
.fe1{
	background: url('../image/icon.png') no-repeat -88px -245px;
	background-size: 150px 280px;
}
.fe2{
	background: url('../image/icon.png') no-repeat -67px -245px;
	background-size: 150px 280px;
}


</style>
