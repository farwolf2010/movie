<template>
  <div  class="bg">
      <head :back="true" title="注册"  @leftClick="leftClick" >

      </head>
    <scroller class="bg">
    <div style="height:550;margin-top: 110;margin-left: 50;margin-right: 50">
        <div  class="cell" >
          <text style="margin-left: 20;width: 125;text-align: right">用  户 名</text>
          <input style="flex: 1;margin-left: 20;height: 100"  type="tel"  v-model="name"  @input="oninput"    placeholder="请输入用户名"/>
        </div>
        <div  class="cell"  style="margin-top: 30" >
            <text style="margin-left: 20;width: 125;text-align: right">密      码</text>
            <input style="flex: 1;margin-left: 20;height: 100"  type="password"  v-model="pass"  @input="oninput"    placeholder="请输入密码"/>
        </div>
        <div  class="cell" style="margin-top: 30" >
            <text style="margin-left: 20;">确认密码</text>
            <input style="flex: 1;margin-left: 20;height: 100"  type="password"  v-model="cpass"  @input="oninput"    placeholder="请再次输入密码"/>
        </div>
        <div  class="cell" style="margin-top: 30">
            <input style="flex:1;margin-left: 20" placeholder="请输入右侧验证码" v-model="code" type="number"    @input="oninput"    ></input>
            <div style="height:70;width: 2;background-color: #f2f2f2"></div>
            <div style="width: 200; align-items: center;justify-content: center" @click="getCode">
                <image :src="codeimg"  style="width: 180;height: 80"  placeholder="root:img/code_loading.png"></image>
                <!--<text>发送验证码</text>-->

            </div>
        </div>



        <button text="注册" style="margin-top: 120"  :disabled="btn_disabled"  @onclick="submit" ></button>
    </div>
    </scroller>
  </div>

</template>
<style src="../css/style.css"></style>
<style>

  .inputclass
  {
     color: red;
     padding-left: 10;
  }
  .next
  {

    height: 100;
    background-color: #ffcd16;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 8;
    text-align: center;
  }
  .next:disabled
  {
      background-color: #eeeeee;
      color: #d3d3d3;
  }

  .text
  {
    color:#929292;
    font-size: 30;
  }
  .text:active
  {
    color:#000000 ;
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
    var finput =require('./../component/input.vue')
    var button =require('./../component/button.vue')
    var head =require('./../component/header.vue')
    var login =require('./../util/login.js')
    var util =require('./../util/util.js')
    var net =require('./../util/net.js')
  export default {
      components:{finput,button,head},
    data() {
          return {
              btn_disabled:true,

              id:'',
              codeimg:'root:img/code_loading.png',
              name:'',
              pass:'',
              cpass:'',
              code:'',


          }
    },
    methods: {


        oninput:function(e)
        {
//            console.log('phone='+this.phone)
//            console.log('phone='+this.code)
            if(this.name!='')
            {
                if(this.pass!='')
                {
                    if(this.cpass!='')
                    {
                        if(this.code!='')
                        {
                            this.btn_disabled=false;
                            return;
                        }
                    }

                }
            }
            this.btn_disabled=true;

        },




        getCode:function()
        {
            var self=this;
            net.post('getcode.do',{},function(res){

               self.id=res.id;
               self.codeimg=res.url;

            });
        },
        checkCode:function()
        {
            var self=this;

        },

        submit:function()
        {
            var navigator = weex.requireModule('navigator');
            if(this.pass!=this.cpass)
            {
                modal.toast({message:'两次输入的密码不一致！'})
            }
            var sefl=this;
            var p={};
            p.name=this.name;
            p.password=this.pass;
            p.code=this.code;
            p.id=this.id;
            net.post('regist.do',p,function(res){


                var modal = weex.requireModule('modal');
                modal.toast({message:'注册成功，请登录！'})
                navigator.back();

            });
        },

    }
      ,
      created:function(){


          var self=this;
          var globalEvent = weex.requireModule('globalEvent') ;
          var navigator = weex.requireModule('navigator') ;

          globalEvent.addEventListener("onPageInit", function (e) {


              const nav = weex.requireModule('navbar');
              self.getCode();
//              nav.setTitle('注册');
//              nav.setBack(true,'black');
//              nav.setBackgroundColor("#ffffff");
//              nav.setTitleColor('#313133');

//              nav.hideBottomLine(false);


          });

          globalEvent.addEventListener("viewWillAppear", function (e) {

              const nav = weex.requireModule('navbar');
              nav.setStatusBarStyle('white');
////              nav.hideBottomLine(true);
//              nav.setBackgroundColor("#ffffff");
//              nav.setStatusBarStyle('black');
//              nav.makeUnTransparent();

          });

          globalEvent.addEventListener("viewWillDisappear", function (e) {

              const nav = weex.requireModule('navbar');
//              nav.makeUnTransparent();
//              nav.hideBottomLine(false);
//              nav.setBackgroundColor("#eeeeee");


          });


      },
      mounted:function()
      {
//          this.getCode();
      }
  }
</script>