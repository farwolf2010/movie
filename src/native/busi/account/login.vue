<template>
  <!--<scroller  >-->

    <div style="background-color: #ffffff;" >
      <head :back="false" title="登录"  @leftClick="leftClick" >
        <image slot="left" src="root:img/back.png" style="width: 80;height: 80"   ></image>
      </head>
    <div style="height:650;margin-top: 120;margin-left: 35;margin-right: 35">
      <div class="cell">
        <text class="title">账户</text>
        <input class="input" type="text" v-model="user"  placeholder="用户名" style="padding-left: 20" />
      </div>
      <div class="cell" style="margin-top: 20">
        <text class="title">密码</text>
        <input class="input" type="password"  v-model="pass" placeholder="请输入密码" style="padding-left: 20" />
      </div>
      <!--<div class="btn" style="margin-left: 0;margin-right: 0;margin-top: 100"><text class="btntext">登录</text></div>-->
      <button text="登录" style="margin-top: 120"  :disabled="btn_disabled"  @onclick="login()" ></button>

      <div style="flex-direction: row;justify-content: center;margin-top: 80">
        <div  @click="regist"    class="a"> <text  @click="regist"  class="text">注册</text> </div>
        <div style="flex: 1"></div>
        <text class="text" ></text>
      </div>
    </div>
      <div style="flex: 1"></div>
    <div style=" margin-bottom: 30;align-items: center;justify-content: center;"><text style="color:#a2a2a2">授权声明：vjshop.com</text></div>
    </div>
  <!--</scroller>-->

</template>
<style src="../css/style.css"></style>
<style>
  .a
  {
    width: 200;
    height: 200;

  }
  .cell
  {
    height: 105;
    align-items: center;
    flex-direction: row;
    border-bottom-width: 1.5;
    border-bottom-color: #eeeeee;

  }
  .text
  {
    color:#929292;
    font-size: 30;
  }


  .input
  {
    height: 105;
    flex: 1;
    padding-left: 30;
    font-size:30 ;

  }
  .title
  {

    font-size: 33;

  }

</style>

<script>
    var button =require('./../component/button.vue')
    var head =require('./../component/header.vue')
    var login =require('./../util/login.js')
    var util =require('./../util/util.js')

  export default {
      components:{button,head},
    data: {
      user: '',
      pass: ''
    },
    methods: {
      update: function (e) {
        this.target = 'Weex'
        console.log('target:', this.target)
      },
        regist()
        {
            var nav=weex.requireModule("navigator");
            nav.push('regist.js')
        },

        leftClick()
        {
            var nav=weex.requireModule("navigator");
            nav.dismiss();
        },
        gotoAddress()
        {
            var navigator = weex.requireModule('navigator') ;
            navigator.push('../address/addAddress.js')
        },
        login ()
        {
            var modal = weex.requireModule('modal') ;
            var navigator = weex.requireModule('navigator') ;
            var modal=weex.requireModule("modal")

             var self=this;

            if(this.user=='')
            {
                modal.toast({message:'请输入用户名!'});
                return;
            }
            if(this.pass=='')
            {
                modal.toast({message:'请输入密码!'});
                return;
            }

            var net=weex.requireModule("net")
            var modal=weex.requireModule("modal")

            login.login(this.user,this.pass,function(res){

//                modal.toast({message:'登录成功!'});
                var notify=weex.requireModule("notify");
                notify.send('login',res)
                navigator.dismissFull(res,true);
                var pref=weex.requireModule("pref");
                pref.setString('user',self.user);
                pref.setString('pass',self.pass);
                notify.send('tabselect',{index:3})
//                navigator.invokeNativeCallBack(res);

//                  navigator.push('../tab/mine.js')
            });

        }

    }
      ,
      created:function(){

          var self=this;
          var globalEvent = weex.requireModule('globalEvent') ;
          var navigator = weex.requireModule('navigator') ;
          navigator.enableBackGesture();
          var pref=weex.requireModule("pref");
          this.user=pref.getString('user')
          this.pass=pref.getString('pass')
          globalEvent.addEventListener("onPageInit", function (e) {


              const nav = weex.requireModule('navbar');
              nav.setStatusBarStyle('white');
              var navigator=weex.requireModule("navigator")
              navigator.enableBackGesture()

          });

          globalEvent.addEventListener("viewWillAppear", function (e) {


              const nav = weex.requireModule('navbar');
              nav.setStatusBarStyle('white');

          });

      }
  }
</script>