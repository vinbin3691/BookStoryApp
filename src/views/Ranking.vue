<template>
  <div>
    <header>
      <a class="arrow_left" @click="arrowLeft">
        <span></span>
      </a>
      <h2>搜索</h2>
      <a href class="user">
        <span></span>
      </a>
    </header>
    <van-search
      v-model.trim="value"
      @input="inputing=true"
      placeholder="请输入搜索关键词"
      input-align="center"
      @blur="Blur(value)"
    />
    <!--热门推荐 -->
    <section v-if="!value">
      <div>
        <div class="searchcmd">热门搜索</div>
        <div class="cmdlist">
          <ul v-if="newHotWords.length>0">
            <li
              v-for="(item,index) in newHotWords"
              :key="index"
              @click="newHotWordsClick(item)"
            >{{item.word}}</li>
          </ul>
          <div v-else class="loading">数据加载中,请稍等......</div>
        </div>
      </div>
    </section>
    <!--热门 显示结果列表 -->
    <div
      v-if="value&&detaildata.cover&&!inputing&&!showFuzzylist"
      class="delist"
      @click="hotresult(detaildata._id)"
    >
      <a>
        <div class="book_img">
          <img :src="` http://statics.zhuishushenqi.com${detaildata.cover} `" />
        </div>
        <div class="msg">
          <h3>{{detaildata.title}}</h3>
          <p class="aut">{{detaildata.author}}</p>
          <p class="short">{{detaildata.longIntro}}</p>
        </div>
      </a>
    </div>
    <!-- 模糊搜索结果列表 -->
    <div class="fuzzyresult" v-if="showFuzzylist&&value&&!inputing">
      <ul>
        <li v-for="(item,index) in  fuzzybook" :key="index" @click="hotresult(item._id)">
          <a>
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
    <!-- 模糊搜索列表 -->
    <div class="fuzzy" v-if="value&&inputing">
      <ul>
        <li
          v-for="(fuzzyitem,index) in keywords"
          :key="index"
          @click="fuzzyClick(fuzzyitem)"
        >{{fuzzyitem}}</li>
      </ul>
    </div>

    <!--历史结果 -->
    <div class="result">
      <span>搜索历史</span>
    </div>

    <div class="resultlist">
      <ul v-if="hash.length!=0">
        <li v-for="(item,index) in hash" :key="index">
          <span class="searchicon"></span>
          <p>{{item}}</p>
          <span class="clearicon" @click="clearIconClick(index)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// http://novel.kele8.cn/hot-books
export default {
  data: function () {
    return {
      value: '',
      newHotWords: [],
      detaildata: {},
      keywords: [],
      inputing: false, //是否正在输入
      blurArr: [],
      fuzzybook: [],
      showFuzzylist: false,
      hash:[]
    }
  },
  // 热门搜索数据
  created() {
    this.axios.get('http://novel.kele8.cn/hot-books').then((res) => {
      this.newHotWords = res.data.newHotWords
    })
  },
  watch: {
    value: function (n) {
      if (n) {
        // 正在输入,模糊搜索
        if (this.inputing) {
          this.axios
            .get('http://novel.kele8.cn/auto-complete?query=' + n)
            .then((res) => {
              // console.log(res)
              this.keywords = res.data.keywords
            })
        } else {
          // 显示结果
        }
      }
    },
    // 去重
    blurArr: function (n) {
      // console.log(n)
      var hash = []
      for (var i = 0; i < n.length; i++) {
        if (hash.indexOf(n[i]) == -1) {
          hash.push(n[i])
        }
      }
    this.hash=hash
    },

  },
  methods: {
    newHotWordsClick: function (item) {
      //
      this.axios
        .get('http://novel.kele8.cn/book-info/' + item.book)
        .then((res) => {
          this.detaildata = res.data
          this.value = item.word
          this.blurArr.push(item.word)
          this.showFuzzylist = false
        })
    },
    arrowLeft: function () {
      if (this.value) {
        this.value = ''
      } else {
        this.$router.go(-1)
      }
    },

    clearIconClick: function (index) {
      // console.log(index)
      this.blurArr.splice(index, 1)
    },
    // 点击模糊列表
    fuzzyClick: function (word) {
      this.value = word
      this.axios
        .get('http://novel.kele8.cn/search?keyword=' + word)
        .then((res) => {
          // console.log('word=>', res)
          this.blurArr.push(word)
          this.inputing = false
          this.fuzzybook = res.data.books
          this.showFuzzylist = true
        })
    },
    // 点击热门搜索结果
    hotresult: function (id) {
      // console.log(id)
      this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    },

    // 失去焦点
    Blur: function (n) {
      // if (n != '') {
      //   this.blurArr.push(n)

      // }
      console.log(n)
    },
  },
}

//搜索结果  http://novel.kele8.cn/search?keyword=%E5%85%B5%E9%94%8B%E5%A4%A9%E4%B8%8B
</script>

<style lang='less' scoped>
@color: #f26552;
.loading {
  height: 30px;
  // padding-top:30px;
  text-align: center;
}
.van-search {
  // background: #f0f0f0;
  // width: 100%;
  margin: 0 auto;
  width: 90%;
  padding: 10px 0px;
}
div {
  text-align: left;
  header {
    // background-color: white;
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    background-color: @color;
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
  section {
    // background-color: white;
    // margin: 0 auto;
    div {
      margin: 0 auto;
      width: 90%;
      text-align: left;
      div.searchcmd {
        padding-top: 10px;
        font-size: 18px;
        color: #6b6b6b;
        width: 100%;
      }
      div.cmdlist {
        margin-top: 10px;
        padding-bottom: 10px;
        ul {
          margin-left: 0px;

          li {
            display: inline-block;
            color: gray;
            padding: 5px 8px;

            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #efeff4;
            margin: 5px;
            font-size: 12px;
          }
        }
      }
    }
  }

  .result {
    padding-top: 10px;
    font-size: 18px;
    color: #6b6b6b;
    width: 90%;
    margin: 0 auto;
  }
  div.delist,
  .fuzzyresult {
    a {
      width: 90%;
      margin: 0 auto;
      height: 100%;
      display: flex;
      .book_img {
        // width: 23%;
        // float: left;
        flex: 3;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-top: 13px;
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
  // 模糊搜索
  .fuzzy {
    ul {
      //  background-color: #fff;
      width: 90%;
      margin: 0 auto;
      // border:1px solid #ccc;
      li {
        height: 30px;
        line-height: 30px;
        padding: 0px 12px;
        background-color: whitesmoke;
        color: #6b6b6b;
        font-size: 14px;
      }
    }
  }
  .resultlist {
    ul {
      width: 90%;
      margin: 0 auto;
      // background-color: whitesmoke;

      li {
        box-sizing: border-box;
        padding: 5px 0px 5px 0px;

        font-size: 14px;
        line-height: 30px;
        height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        display: flex;
        .clearicon {
          background: url('../image/icons2.png') no-repeat -210px -115px;
          background-size: 300px 400px;
          width: 16px;
          height: 18px;
          float: right;
          margin-top: 11px;
        }
        p {
          flex: 1;
          padding-left: 5px;
        }
        .searchicon {
          background: url('../image/icons2.png') no-repeat -50px 0;
          background-size: 300px 400px;
          width: 14px;
          height: 14px;
          float: left;
          margin-top: 8px;
        }
      }
    }
  }
}
</style>