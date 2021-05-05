<template>
  <div class="total">
    <header>
      <a class="arrow_left" @click="$router.go(-1)">
        <span></span>
      </a>
      <h2>充值</h2>

      <a href class="user">
        <span></span>
      </a>
    </header>
    <div class="login">
      <form action>
        <img src="../image/dl_logo.png" alt />
        <ul>
          <li>
            <span></span>
            <input type="text" placeholder="用户名/邮箱" v-model="email" />
          </li>
        
          <li>
            <span class="pass"></span>
            <input type="text" placeholder="密码"  v-model="password"  @keyup.enter="login()"/>
          </li>
     
        </ul>
        <p>
          <a href>立即注册</a>
        </p>
        <button type="submit" @click="login()">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return{
      email:'',
      password:"",
    }
  },
  methods:{
    login(){
console.log('xxx')
    }
  }
}
</script>

<style lang='less' scoped>
@color: #f26552;
.total {
  background: #f0f0f0;
  height:667px;
// margin-bottom: 10px;
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

  .login {
    width: 90%;
    padding: 0px 12px;
    margin: 0 auto;
    form {
      margin: 0 auto;
      img {
        margin: 25px auto 20px;
        display: block;
        width: 40px;
        height: 52px;
      }
      ul {
        width: 100%;
        overflow: hidden;
        border: 1px solid #d2d2d2;
        border-radius: 2px;
        background: #fff;
        // padding: 0 10px;
        box-sizing: border-box;
        margin-bottom: 14px;
        li {
          height: 40px;
          padding-left: 36px;
          position: relative;
          span {
            left: 10px;
            top: 13px;
            background-color: #ccc;
            display: inline-block;
            position: absolute;
            background: url('../image/icon.png') no-repeat -16px -266px;
            background-size: 150px 280px;
            width: 15px;
            height: 13px;
          }
          span.pass {
            background: url('../image/icon.png') no-repeat 0 -266px;
            background-size: 150px 280px;
            width: 12px;
            height: 13px;
            left: 12px;
            top: 13px;
          }
          input {
            padding: 0px;
            font-size: 14px;
            line-height: 40px;
            outline: none;
            border: 0px;
            box-sizing: border-box;
            border-bottom: 1px solid #d2d2d2;
            width: 100%;
          }
        }
      }
      P {
        overflow: auto;
        zoom: 1;
         a {
           font-size: 13px;
          float: right;
          color: @color;
        }
      }
      button{
        width:100%;
        background-color: @color;
        height: 44px;
        line-height: 44px;
        border-radius: 4px;
        text-align: center;
        color:#fff;
        display: block;
        font-size: 15px;
        margin-top: 14px;
        outline: none;
        border: 0px;
      }
    }
  }
}
</style>