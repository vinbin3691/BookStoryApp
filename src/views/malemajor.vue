<template>
  <div>
    <header>
      <a class="arrow_left" @click="arrowClick">
        <span></span>
      </a>
      <h2>{{this.$route.query.major}}</h2>

      <a href class="user">
        <span></span>
      </a>
    </header>
    <section >
      <ul v-if='books.length>0'>
        <li v-for="(item,index) in books" :key="index"  @click="booksdetailClick(item._id)">
          <a >
            <div class="book_cov">
              <img :src="   `http://statics.zhuishushenqi.com${item.cover}  `"/>
            </div>
            <div class="book_inf">
              <div class="inf_top">
                <p class="title">{{item.title}}</p>
                <p class="time"><span>{{item.retentionRatio}}%</span>读者留存</p>
              </div>
              <p class="aut">{{item.author}}</p>
              <p class="int">{{item.shortIntro}}</p>
            </div>
          </a>
        </li>
      </ul>
      
      <div v-else class="loading">数据加载中......</div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'malemajor',
  data: function () {
    return {
      books: [],
    }
  },
  methods: {
    arrowClick: function () {
      this.$router.push({ name: 'Stacks' })
    },
    booksdetailClick:function(id) {
   this.$router.push({
        path: '/detaillist',
        query: {
          id,
        },
      })
    
    }
  },
  created() {
    this.axios
      .get(
        'http://novel.kele8.cn/category-info?gender='+ this.$route.query.gender+'&type=hot&major=' +
          this.$route.query.major +
          '&minor=&start=0&limit=20'
      )
      .then((res) => {
        // console.log(res)
        this.books = res.data.books
      })
  },
}
</script>

<style lang='less' scoped>
@color: #f26552;
.loading{
margin-top: 300px;
}
div {
  header {
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
    background-color: #fff;

    ul {
        font-size: 0px;
      width: 90%;
      margin: 0 auto;
      padding-top: 30px;
      li {
        text-align: left;
        margin-bottom: 30px;
        a {
          overflow: auto;
          zoom: 1;
        //   display: inline-block;
        display:flex;
          div.book_cov {
            
            margin-right: 10px;
            
            img {
                display: inline-block;
              width: 68px;
              height: 84px;
              background-color: skyblue;
            }
          }
          .book_inf {
            flex:1;
          
            
            .inf_top {
                overflow: hidden;
                zoom:1;
              .title {
                max-width: 50%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 14px;
                color: #333;
                float: left;
              }
              .time {
                float: right;
                color:#999;
                font-size: 13px;
                span{
                    color:@color;
                }
              }
            }
            p.aut{
                font-size: 13px;
                margin:6px 0px;
                color:#ccc;
            }
            p.int{
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
}
</style>