<template>
  <div>
    <header>
      <a href class="arrow_left">
        <span></span>
      </a>
      <h2 v-if='id=="5a683b68fc84c2b8efa68fc2"'>会员点击榜单</h2>
      <h2 v-if='id=="5a39ca3ffc84c2b8ef82da82"'>鲜花榜单</h2>
      <a href class="user">
        <span></span>
      </a>
    </header>
    <recommendTitle :vipAll="vipAll" v-if='id=="5a683b68fc84c2b8efa68fc2"'></recommendTitle>
    <recommendTitle :vip="vip" v-if='id=="5a39ca3ffc84c2b8ef82da82"'></recommendTitle>


    <ul v-if='bookAll.length>0'>
      <li v-for="(item,index) in bookAll" :key="index" @click="vipAllClick(item._id)">
        <a>
          <dl>
            <dt :class="learr[index]" v-if="index<3">{{index+1}}</dt>
            <dt class="gearr" v-if="index>=3">{{index+1}}</dt>

            <dd>
              <div class="img">
                <img :src="` http://statics.zhuishushenqi.com${item.cover} `" />
              </div>
              <div class="msg">
                <h3>{{item.title}}</h3>
                <p class="aut">{{item.author}}</p>
                <p class="text">{{item.shortIntro}}</p>
              </div>
            </dd>
          </dl>
        </a>
      </li>
    </ul>
    <div class="loading" v-else>数据加载中，请稍等......</div>
  </div>
</template>

<script>
import recommendTitle from '@/components/recommendTitle.vue'
export default {
      
  data: function () {
    return {
      id: null,
      bookAll: [],
      learr: ['all1', 'all2', 'all3'],
     
    }
  },
  components: {
    recommendTitle,
  },
  computed: {
    vipAll: function () {
      return this.$store.state.vipAll
    },
    vip: function () {
      return this.$store.state.vip
    },
  },
  created() {
    this.id = this.$route.query.id
    this.axios.get('http://novel.kele8.cn/rank/' + this.id).then((res) => {
      console.log(res)
      this.bookAll = res.data.ranking.books
    })
  },
  methods:{
      vipAllClick:function(id) {
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

<style lang='less' scoped>
@color: #f26552;
.loading{
text-align: center;
padding-top:300px ;
height: 300px;
}
div {
  background-color: white;
  text-align: left;
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

  ul {
    width: 90%;
    margin: 0 auto;
    li {
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
                height: 87px;
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
  .all2 {
    background: url('../image/icon.png') no-repeat -92px -27px;
    background-size: 150px 280px;
  }
  .all3 {
    background: url('../image/icon.png') no-repeat -119px -27px;
    background-size: 150px 280px;
  }
  .all1 {
    background: url('../image/icon.png') no-repeat -68px -27px;
    background-size: 150px 280px;
  }
  .gearr {
    background: url('../image/icon.png') no-repeat 0 -53px;
    background-size: 150px 280px;
  }
}
</style>