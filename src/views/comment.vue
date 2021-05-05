<template>
<div>

  <div v-if="detaildata!=null">
    <header>
      <a  class="arrow_left" @click="$router.go(-1)">
        <span></span>
      </a>
      <h2>{{detaildata.title}}</h2>
      <a href class="user">
        <span></span>
      </a>
    </header>
    <div class="total">
      <ul ref="textcontent" class="textcontent">
        <li v-for="(myreview,index) in reviews" :key="index">
          <img :src="`http://statics.zhuishushenqi.com${myreview.author.avatar}`" />
          <div>
            <p class="comment-author">
              <span class="autor_name">{{myreview.author.nickname}}</span>
              <span class="gread gread_lv">LV{{myreview.author.lv}}</span>
              <!-- <span class="gread gread_vip">高级</span> -->
              <span class="gread gread_status">见习</span>
            </p>
            <p class="comment-content">{{myreview.content}}</p>
            <p>
              <span class="when-comment">{{myreview.updated|updateformat}}</span>
              <span class="commentimg">
                <span class="icon"></span>
                <span class="text">{{myreview.likeCount}}</span>
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <div @click="addComment">
        <img src="http://img.yc.ireader.com.cn/avatar/000/21/04/77_avatar_middle.jpg" />
        <p>我来说两句…(｡◕∀◕｡)</p>
      </div>
    </div>
    <van-popup
      v-model="show"
      :round="true"
      position="bottom"
      :style="{ height: '135px',background:'white' }"
    >
      <div class="real_input">
        <textarea maxlength="300" placeholder="我来说两句…(。◕∀◕。)" v-model="something"></textarea>
      </div>
      <div class="fabu" @click="fabuClick">发布</div>
    </van-popup>
  </div>

</div>

</template>

<script>
export default {
  data: function () {
    return {
      show: false,
      id: null,
      detaildata: null,
      reviews: [],
      showcomment: false,
      something: '',
      fabu:false,
      // arr: [],
    }
  },
  filters: {
    updateformat: function (a) {
      var date = a.slice(0, 10)
      return date
    },
  },
  created() {
    this.id = this.$route.query.id
    if (this.id != null) {
      this.axios.get('/api/book/' + this.id).then((res) => {
        this.detaildata = res.data
      })

      // console.log('localStorage.length', localStorage.length)

      // if (localStorage.length > 2) {
      //   this.reviews = JSON.parse(localStorage.getItem('key'))
      //       // console.log(this.reviews)

      // } else {
        this.axios
          .get('/api/post/review/by-book?book=' + this.id + '&sort=updated')
          .then((res) => {
            // console.log('书籍评论=>', res)
            this.reviewslength = res.data.total
            this.reviews = res.data.reviews
            if(this.reviews.length>10){
              this.reviews = res.data.reviews.slice(0,10)
            }
            // console.log(this.reviews)
            this.showcomment = true
          })
      
      }
    // }
  },
  methods: {
    addComment: function () {
      this.show = true
    },
    fabuClick: function () {
      var obj = {
        author: {
          activityAvatar: '',
          avatar: '/avatar/1e/d3/1ed3bbbd1b0fea70807107041d6a52e8',
          lv: 0,
          nickname: '新用户' + parseInt(Math.random() * 100000000),
          type: 'normal',
          commentCount: 0,
        },
        content: this.something,
        title: this.something,
        updated: new Date().toLocaleDateString().replace(/\//g, '-'),
      }
      this.show = false
      this.something = ''
      
      this.reviews.unshift(obj)
      localStorage.setItem('key', JSON.stringify(this.reviews))
    },
  },
}
</script>

<style lang='less' scoped>
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
  .total {
    background-color: white;
    ul.textcontent {
      width: 90%;
      margin: 0 auto;
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
    }
  }
  .bottom {
    width: 100%;
    height: 55px;
    bottom: 0px;
    position: fixed;
    background-color: white;
    box-shadow: 0px 0px 2px #ccc;
    box-sizing: border-box;
    div {
      width: 90%;
      margin: 0 auto;
      overflow: auto;
      zoom: 1;
      display: flex;
      img {
        border-radius: 50%;
        height: 30px;
        width: 30px;
        object-fit: cover;
        margin-right: 8px;
        float: left;
        margin-top: 12px;
      }
      p {
        flex: 1;
        float: left;
        margin-top: 10px;
        padding: 6px 10px 6px 5px;
        color: #2630364d;
        background-color: #f8f8f8;
      }
    }
  }
  .van-popup {
    .real_input {
      textarea {
        margin-top: 12px;
        padding: 2px;
        width: 242px;
        height: 112px;
        background-color: #f8f8f8;
        float: left;
        margin-left: 14px;
        margin-right: 10px;
        font-size: 14px;
        border: 0px;
      }
    }
    div.fabu {
      // display: inline-block;
      margin-top: 57px;
      float: left;
    }
  }
}
</style>