<template>
  <div v-if="this.$route.name=='Stacks'&&sonmale&&sonfemale&&sonpress">
    <header>
      <a  class="arrow_left" @click="$router.push({
        path:'/'
      })">
        <span></span>
      </a>
      <h2>分类</h2>

      <a href class="user">
        <span></span>
      </a>
    </header>

    <van-tabs v-if="sonmale.length>0&& sonfemale.length>0&& sonpress.length>0">
     
      <van-tab title="男生频道">
        <div class="malesort">
          <ol>
            <li v-for="(item,index) in male" :key="index" @click.prevent="malesonClick(item.name,'male')">
              <a>
                <div class="leftimg">
                  <img :src=" ` http://statics.zhuishushenqi.com${item.bookCover[0]} `" alt />
                </div>

                <div class="righttext">
                  <p class="major">{{item.name}} ({{item.bookCount}})</p>

                  <p class="tag" v-if="sonmale.length>0">
                    <span v-for="(tag,index) in (sonmale[index].mins.slice(0,3))" :key="index">
                      <span class="mytag">{{tag}}</span>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </van-tab>

      <van-tab title="女生频道">
        <div class="malesort">
          <ol>
            <li v-for="(item,index) in female" :key="index" @click.prevent="malesonClick(item.name,'female')">
              <a >
             <div class="leftimg">
                <img :src=" ` http://statics.zhuishushenqi.com${item.bookCover[0]} `" alt />
               </div>
               
                <div class="righttext">
                  <p class="major">{{item.name}} ({{item.bookCount}})</p>
                  <p class="tag" v-if=" sonfemale.length>0">
                    <span v-for="(tag,index) in ( sonfemale[index].mins.slice(0,1))" :key="index">
                      <span class="mytag">{{tag}}</span>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </van-tab>
      <van-tab title="出版社">
        <div class="malesort">
          <ol>
            <li v-for="(item,index) in press" :key="index" @click.prevent="malesonClick(item.name,'press')">
              <a href>
                  <div class='leftimg'>
                <img :src=" ` http://statics.zhuishushenqi.com${item.bookCover[0]} `" alt />

                  </div>
                <div class='righttext'>
                  <p class="major">{{item.name}} ({{item.bookCount}})</p>
                  <p class="tag" v-if="sonpress.length>0">
                    <span
                      v-for="(tag,index) in (sonpress[index].mins.slice(0,3))"
                      :key="index"
                   
                    >
                      <span class="mytag">{{tag}}</span>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </van-tab>
    </van-tabs>
     <div class="loading" v-else>数据加载中,请稍等......</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      male: [],
      female: [],
      press: [],
      sonmale: [],
      sonfemale: [],
      sonpress: [],
    }
  },
  computed: {
    malesort: function () {
      return this.$store.state.malesort
    },
  },
  created() {
    // 获取分类
    this.axios.get('http://novel.kele8.cn/categories').then((res) => {
      // console.log(res)
      this.male = res.data.male
      this.female = res.data.female
      this.press = res.data.press
    })
    // 获取子分类
    this.axios.get('http://novel.kele8.cn/sub-categories').then((res) => {
      // console.log(res)
      this.sonmale = res.data.male
      this.sonfemale = res.data.female
      this.sonpress = res.data.press
    })
  },
  methods: {
    // http://novel.kele8.cn/category-info?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20
    malesonClick: function (name,gender) {
      this.axios
        .get(
          'http://novel.kele8.cn/category-info?gender='+gender+'&type=hot&major=' +
            name +
            '&minor=&start=0&limit=20'
        )
        .then((res) => {
          console.log(res)
        })

      this.$router.push({
        name: 'malemajor',
        query: {
            gender:gender,
          major: name,
         
        },
      })
    },
  },
}
</script>

<style lang='less' scoped>
@color: #f26552;
div.loading{
  padding-top: 300px;
 text-align: center;
  width:100%;
  // background-color: red;
  height: 300px;
}
div {
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
}
.malesort {
  width: 100%;

  background-color: white;
  ol {
    font-size: 0px;
    padding-top: 15px;
    width: 90%;
    margin: 0 auto;

    li {
      a {
        display: flex;
        margin-top: 10px;
        .leftimg {
          img {
            width: 42px;
            height: 58px;
          }
        }
        .righttext {
          flex: 1;
          color: black;
          margin-left: 10px;
          p.major {
            height: 32px;
            line-height: 32px;
            // background-color: red;
            color: black;
            font-size: 14px;
          }
          p.tag {
            display: flex;
            justify-content: space-between;
            span {
              span.mytag {
                height: 26px;
                width: 100%;
                font-size: 14px;
                color: #999;
                line-height: 26px;
              }
            }
          }
        }
      }
    }
  }
}
</style>