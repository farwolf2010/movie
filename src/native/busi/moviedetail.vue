<template>

    <div style="background-color: #333333" append="tree">
        <head title="详情" @rightClick="collect">
            <text    style="margin-top: 25;color: #ffffff;margin-left:80;font-size: 30" :style="{'margin-left':coltext=='收藏'?80:50}" slot="right">{{coltext}}</text>
        </head>

            <div style="flex-direction: row">
             <image style="width: 220;height: 330;margin-left: 40;margin-top: 40"  resize="cover"   placeholder="root:img/default.png" :src="item.img">

             </image>
                <div style="flex: 1;height: 330;margin-top: 40;padding-left: 20;">
                    <div style="flex-direction: row">
                        <text style="color:#ffffff;font-size: 35;font-weight: bold;line:2;width: 400">{{item.name}}{{item.id}}</text>


                    </div>
                    <!--<div class="dl">-->
                        <!--<text style="color: #ffffff;font-size: 30">评分:</text>-->
                        <!--<div style="flex-direction: row;justify-content: center">-->
                            <!--<star style="margin-left: 0;margin-top: 0"></star>-->
                            <!--<text style="color: #ffffff;font-size: 30">  {{item.star}}分</text>-->
                        <!--</div>-->

                    <!--</div>-->
                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">类型:</text>
                        <text style="color: #ffffff;font-size: 30">  {{item.typeName}}</text>
                    </div>
                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">地区:</text>
                        <text style="color: #ffffff;font-size: 30">  {{item.country}}</text>
                    </div>

                    <!--<div class="dl" >-->
                        <!--<text style="color: #ffffff;font-size: 30">进度:</text>-->
                        <!--<text style="color: #ffffff;font-size: 30" v-if="item.isend==0" > 至第{{item.latestNo}}集</text>-->
                        <!--<text style="color: #ffffff;font-size: 30" v-if="item.isend==0&&item.total!=-1" > /共{{item.total}}集</text>-->
                        <!--<text style="color: #ffffff;font-size: 30"  v-if="item.isend==1">已完结 共{{item.total}}集</text>-->
                    <!--</div>-->
                    <div class="dl">
                        <text style="color: #ffffff;font-size: 30">年代:</text>
                        <text style="color: #ffffff;font-size: 30;margin-top: 5">  {{item.year}}</text>
                    </div>
                </div>
            </div>

        <div style="flex: 1;margin-top: 50">

            <div     style="position: absolute;left: 20;top: 10;right: 20;bottom: 100">

                <web  style=" background-color:#333333;position: absolute;left: 0;right: 0;top: 0;bottom: 0" :src="item.des"></web>
                <div :style="{'visibility':showmask?'visible':'hidden'}"  style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #333333">

                </div>

            </div>
        </div>


        <div class="progress"  v-if="isloading">
            <floading   style="height: 40;width: 40;margin-top: 20" color="#ffffff" loading-style="big"  > </floading>
            <text style="margin-left: 0;color: #ffffff;font-size:30;margin-top: 30;font-weight: bold">加载中...</text>
        </div>

        <div @click="copy" style="height: 100;position: absolute;bottom: 0;left: 0;right: 0;background-color: #0088fb;align-items: center;justify-content: center">
           <text style="color: #ffffff;font-size: 32">点击下载</text>
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
                showmask:true,
                coltext:'收藏'


            }
        },
        methods: {
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
            copy()
            {
                const clipboard = weex.requireModule('clipboard')
                clipboard.setString(this.item.download_url)
                const modal=weex.requireModule('modal')
//                modal.toast({message:this.item.download_url})
                modal.toast({message:'复制成功'})

            },
            getVisable(it)
            {
                 if(it.serial==undefined)
                     return false;
               return   it.serial.length==0;
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
                   if( this.item.des!='')
                   this.showmask=false;
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
