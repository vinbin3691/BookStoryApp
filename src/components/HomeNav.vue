<template>
  <header>
    <div class="logo">
      <img src="../image/logo.png" alt />
    </div>

    <ul class="route">
      <li>
        <router-link to="/Male">
          <a>男频</a>
        </router-link>
      </li>
      <li>
        <router-link to="/Female">
          <a>女频</a>
        </router-link>
      </li>
      <li>
        <router-link to="/Stacks">
          <a>书库</a>
        </router-link>
      </li>
      <li>
        <router-link to="/Ranking">
          <a>搜索</a>
        </router-link>
      </li>

      <li>
        <router-link to="/Recharge">
          <a>充值</a>
        </router-link>
      </li>
    </ul>

    <div class="icon" @click='$router.push({path:"/bookrack"})'>
      <span></span>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang='less'  scoped>
@color: #f26552;
header {
  display: flex;
  // justify-content: space-between;
  height: 44px;
  width: 100%;
  text-align: center;
  background-color: @color;
  // display: flex;
  div.logo {
    display: inline-block;
    img {
      height: 30px;
      width: 65px;
      margin-top: 7px;
      margin-left: 7px;
    }
  }
  ul.route {
    height: 44px;
    display: flex;
    flex: 1;
    li {
      // padding:0px 6px;
      flex: 1;
      display: inline-block;
      line-height: 44px;
      height: 100%;
    }
    a {
      font-size: 14px;
      color: #fff;
    }
  }
}
div.icon {
  width: 40px;
  height: 44px;
  text-align: center;
  span {
    // display: inline-block;
    // background: url('../image/icon.png') no-repeat -3px -3px;
    // background-size: 150px 280px;
    // width: 16px;
    // height: 16px;
    // margin-top: 11px;
	background: url('../image/icons2.png') no-repeat -164px -65px;
	background-size: 300px 400px;
	width: 20px;
  height: 22px;
  display: inline-block;
  margin-top: 11px;
  }
}
</style>