<template>

    <div style="background-color: #333333" >
        <head title="详情" @rightClick="collect"  append="tree">
            <text :style="{'margin-left':coltext=='收藏'?80:50,'margin-top':isOs43()?5:25}"     style="margin-top: 25;color: #ffffff;margin-left:80;font-size: 30"  slot="right">{{coltext}}</text>

        </head>

            <div style="flex-direction: row" append="tree">
             <image append="tree" style="width: 220;height: 330;margin-left: 40;margin-top: 40"  resize="cover"   placeholder="root:img/default.png" :src="item.img">

             </image>
                <div style="flex: 1;height: 330;margin-top: 40;padding-left: 20;">
                    <div style="flex-direction: row">
                        <text style="color:#ffffff;font-size: 35;font-weight: bold">{{item.name}}{{item.id}}</text>


                    </div>

                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">评分:</text>
                        <div style="flex-direction: row;justify-content: center">
                            <star style="margin-left: 0;margin-top: 0"></star>
                            <text style="color: #ffffff;font-size: 30">  {{item.star}}分</text>
                        </div>

                    </div>
                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">类型:</text>
                        <text style="color: #ffffff;font-size: 30">  {{item.typeName}}</text>
                    </div>
                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">地区:</text>
                        <text style="color: #ffffff;font-size: 30">  {{item.country}}</text>
                    </div>

                    <div class="dl" >
                        <text style="color: #ffffff;font-size: 30">进度:</text>
                        <text style="color: #ffffff;font-size: 30" v-if="item.isend==0" > 至第{{item.latestNo}}集</text>
                        <text style="color: #ffffff;font-size: 30" v-if="item.isend==0&&item.total!=-1" > /共{{item.total}}集</text>
                        <text style="color: #ffffff;font-size: 30"  v-if="item.isend==1">已完结 共{{item.total}}集</text>
                    </div>
                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">时间:</text>
                        <text style="color: #ffffff;font-size: 30;margin-top: 5">  {{item.time}}</text>
                    </div>
                </div>
            </div>
            <div style="align-items: center;margin-top: 25" append="tree">
                <cator style="width: 300" :items="['剧集','简介']" theme="#1296db" @change="change"></cator>
            </div>
        <div style="flex: 1">
            <div  :style="{'visibility':selectIndex==0?'visible':'hidden'}" style="position: absolute;left: 20;top: 10;right: 20;bottom: 0">
                <list  v-if="!getVisable(item)">
                    <cell v-for="it in item.serial">
                    <div style="height: 70;margin-top: 20;flex-direction: row;" @click="itemClick(it)"  >
                        <div style="justify-content: center;margin-left: 18">
                            <text style="color: #ffffff;font-size: 30">第{{it.serialNo}}集</text>
                            <!--<text style="color: #ffffff;margin-top: 20">2017-01-01</text>-->
                        </div>
                        <div style="flex: 1;"></div>
                        <div style="justify-content: center;margin-right: 18">
                            <text style="color: #ffffff;font-size: 30">复制</text>
                        </div>

                    </div>

                    </cell>
                </list>
                <div v-if="getVisable(item)" style="justify-content: center;align-items: center;height: 100">
                    <text style="color: #ffffff;font-size: 30">未找到下载列表！</text>
                </div>
            </div>
            <div  :style="{'visibility':selectIndex==1?'visible':'hidden'}"  style="position: absolute;left: 20;top: 10;right: 10;bottom: 0">

                <web  style=" background-color:#333333;position: absolute;left: 0;right: 0;top: 0;bottom: 0" :src="item.des"></web>

            </div>
        </div>
        <div class="progress"  v-if="isloading">
            <floading   style="height: 40;width: 40;margin-top: 20" color="#ffffff" loading-style="big"  > </floading>
            <text style="margin-left: 0;color: #ffffff;font-size:30;margin-top: 30;font-weight: bold">加载中...</text>
        </div>
    </div>

</template>

<style src="./css/style.css"></style>
<style  >
    .progress
    {
        width: 220;
        height: 220;
        opacity: 0.8;
        background-color: black;
        border-radius: 30;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 265;
        top:650;


    }
    .dl
    {
        flex-direction: row;margin-top: 15
    }
    .indicator
    {
        width:750px;
        height:316px;
        position:absolute;
        item-color:#ffffff;
        item-selected-color:#777777;
        item-size:20px;
        top:120px;
        left:1;
    }
    .slider{width:750px;height:316px;}
    .frame{width:750px;height:316px;position:relative;}

    .image{width:750px;height:316px;}

</style>
<script>
    var flist =require('./component/flist.vue')
    var head =require('./component/header.vue')
    var star =require('./component/star.vue')
    var cator =require('./component/indicator.vue')
    var net =require('./util/net.js')
    const login =require('./util/login.js')
    export default {
        components:{flist,head,star,cator},
        data () {
            return {
                item:{},
                selectIndex:0,
                isloading:false,
                coltext:'收藏',



            }
        },
        methods: {
            jumpto()
            {
                const navigator = weex.requireModule('navigator');
                navigator.pushParam('detail.js',this.item)
            },
            backto()
            {
                const navigator = weex.requireModule('navigator');
                navigator.backTo('index')
            },
            isOs43()
            {
                if(weex.config.env.platform=='android')
                {
//                    if(weex.config.env.osVersion=)
                    var p=weex.config.env.osVersion
                    p= p.replace(/\./g,'')
                    if(p.length<3)
                        p=p+"0";
                    if(p<='440')
                    {
                        return true
                    }
                    return false;
                }
                return false;

            },
            collect()
            {

                if( this.coltext=="已收藏")
                {
                    return;
                }
                var p={};
                p.filmid=this.item.id;
                net.post('auth/collect/add.do',p,(res)=>{
                  var notify=weex.requireModule("notify")
                    notify.send('collectionrefrsh',{})
                    this.coltext="已收藏";
                    var modal=weex.requireModule("modal")
                    modal.toast({message:'收藏成功!'})
                })
            },
            check()
            {
                if(!login.isLogin())
                    return;
                var p={};
                p.filmid=this.item.id;
                net.postSilent('auth/collect/check.do',p,(res)=>{
                   if(res.collect)
                   {
                       this.coltext="已收藏";
                   }
                   else
                    this.coltext="收藏";
                })
            },
            getVisable(it)
            {
                 if(it.serial==undefined)
                     return false;
               return   it.serial.length==0;
            },
            itemClick(item)
            {
                const clipboard = weex.requireModule('clipboard')
                clipboard.setString(item.dowloadurl)
                const modal=weex.requireModule('modal')
                modal.toast({message:'复制成功'})
            },
            change(index)
            {
                  this.selectIndex=index;
            },
            load(id)
            {
               net.postShort ('movieById.do',{id,id},{},()=>{
                  //start
                   this.isloading=true
               },(res)=>{
                    this.item=res.film
               },()=>{
                   this.isloading=false
               })
            }



        },

        created:function(){

            var self=this;
            var globalEvent = weex.requireModule('globalEvent') ;
            globalEvent.addEventListener("onPageInit", function (e) {

                var notify=weex.requireModule("notify")
                notify.regist('login',()=>{
                    self.check();
                })
               var nav=weex.requireModule("navigator")
               self.item=  nav.param();
               self.load(self.item.id)
                if(!login.isLogin())
                    return;
                 self.check();
            });

        },

//        watch: {
//
//
//            disabled:{
//                immediate: true,
//                handler (val) {
//
//                }
//            }
//        }
    }
</script>
