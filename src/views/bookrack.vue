<template>
  <div>
    <header>
      <a class="arrow_left" @click="arrowLeft">
        <span></span>
      </a>
      <h2>书架</h2>
      <a href class="user">
        <span></span>
      </a>
    </header>

    <ul v-if="res">
      <li v-for="(item,index) in  res" :key="index" @click="tiaozhuang(item.data._id)">
        <a>
          <div class="book_img">
            <img :src="` http://statics.zhuishushenqi.com${item.data.cover} `" />
          </div>
          <div class="msg">
            <h3>{{item.data.title}}</h3>
            <p class="aut">{{item.data.author}}</p>
            <p class="short">{{item.data.longIntro}}</p>
          </div>
          <div class="delete" @click.stop="deletehandler(item.data._id)">
            <span></span>
          </div>
        </a>
      </li>
    </ul>

    <div class="loading" v-if="res.length==0">
      <div>
        <img src="../image/shou_con.png" alt />
      </div>
      <p>暂无收藏</p>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data: function () {
    return {
      idlist: [],
      arr: [],

      res: [],
    }
  },
  created() {
    // this.handler()
  },
  activated() {
    if (window.localStorage.shoucan) {
      var list = window.localStorage.getItem('shoucan')
      list = list.replace(/\\|(")/g, '')
      var str = list.replace(/\[|]/g, '')
      this.arr = str.split(',')
      this.res = []
      console.log(this.arr)
      if (this.arr != '') {
        this.arr.forEach((item) => {
          this.axios
            .get('http://novel.kele8.cn/book-info/' + item)
            .then((res) => {
              // console.log(res)
              this.res.push(res)
            })
        })
      }

      //  this.arr.reverse()
    }
  },

  methods: {
    deletehandler: function (id) {
      Dialog.confirm({
        message: '您确定要删除吗？',
      })
        .then(() => {
          // on confirm
          console.log('确定删除', id)
          console.log(this.arr.indexOf(id))
          this.arr.splice(this.arr.indexOf(id), 1)
          console.log(this.arr)
          localStorage.setItem('shoucan', JSON.stringify(this.arr))
          this.$router.go(0)
        })

        .catch(() => {
          // on cancel
          console.log('取消删除')
        })
    },
    tiaozhuang: function (id) {
      this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    },
    arrowLeft: function () {
      this.$router.go(-1)
    },
    // handler: function () {

    //   if (window.localStorage.shoucan) {
    //     //   console.log(JSON.stringify(window.localStorage.getItem('shoucan')))

    //     var list = window.localStorage.getItem('shoucan')
    //     // console.log(list)
    //     list = list.replace(/\\|(")/g, '')
    //     //   var reg1 = new RegExp(']', '')
    //     //   var a = list.replace(reg1, '')
    //     //   console.log(a)

    //     var str = list.replace(/\[|]/g, '')
    //     this.arr = str.split(',')
    //       this.cover=[],
    //     this.title=[],
    //     this.author=[],
    //     this.longIntro=[],

    //     this.arr.forEach((item) => {
    //       // console.log(item)

    //       this.axios
    //         .get('http://novel.kele8.cn/book-info/' + item)
    //         .then((res) => {
    //           // console.log(res)
    //           this.cover.push(res.data.cover)
    //           this.title.push(res.data.title)
    //           this.author.push(res.data.author)
    //           this.longIntro.push(res.data.longIntro)
    //         })
    //     })
    //      this.cover.reverse()
    //        this.title.reverse()
    //         this.author.reverse()
    //         this.longIntro.reverse()
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
@color: #f26552;
.goods-card {
  margin: 0;
  // background-color:white;
}

.delete-button {
  height: 100%;
}

.loading {
  height: 17.25rem;
  width: 100%;
  margin: 0 auto;

  div {
    width: 100%;

    margin-bottom: 25px;
    text-align: center;
    padding-top: 34%;
    img {
      width: 97px;
    }
  }
  p {
    text-align: center;
    color: #bdc0c2;
    font-size: 16px;
  }
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
div {
  text-align: left;
}
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
      .delete {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 20px;
        span {
          display: inline-block;
          background: url('../image/icons2.png') no-repeat -210px -115px;
          background-size: 300px 400px;
          width: 16px;
          height: 18px;
        }
      }
    }
  }
}
</style>
