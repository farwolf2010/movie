<template>
    <div style="background-color: #333333" >
        <div style="height: 130;background-color: #222222">


        <div style="flex-direction: row;margin-top: 50;">


            <searchbox  ref="searchbox" radius="60" @return="onreturn" placeholder_color="#8d909a" @change="change" :value="keyword"  :autofocus="false" :needCancel="false" @blur="onblur" style="height: 80;flex: 1;margin-right:15;margin-left: 15"  >

            </searchbox>
            <div style="align-items: center;justify-content: center;margin-right: 20;margin-top: -10" @click="cancelClick" >
               <text style="color: #0088fb;font-size: 30">取消</text>
            </div>
        </div>
        </div>


        <flist ref="list" background="#333333" style="flex: 1"  columnCount="3" progressTop="500" columnGap="1"  @load="load" @refresh="refresh" emptyTxt="暂无电视剧">

            <cell slot="cell"  v-for="(item, index) in items" >
                <div  @click="gotoDetail(item)"  style="margin-top: 20; height: 380;align-items:center " :style="{'margin-left':getleft(index),'margin-right':getright(index)}"  >
                    <div style="position: absolute;left: 0;right: 0;bottom: 50;top: 0;">
                        <image style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;" resize="cover"   placeholder="root:img/default.png" :src="item.img"></image>

                        <div style="align-items: center;justify-content: center; width: 100;height: 50;background-color: #000000;opacity: 0.7;position: absolute;bottom: 0;right: 0;border-radius: 0">

                        </div>
                        <div v-if="item.isSerial==0" style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text   style="color: #ffffff;font-size: 28;">{{item.sharpName}}</text>

                        </div>
                        <div v-if="item.isSerial==1" style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text v-if="item.isend==0" style="color: #ffffff;font-size: 28;">至{{item.latestNo}}集</text>
                            <text  v-if="item.isend==1" style="color: #ffffff;font-size: 28;">共{{item.total}}集</text>
                        </div>
                    </div>
                    <text style="color: #ffffff;font-size: 25;position: absolute;left: 0;right: 0;bottom: 0;;text-align: center;lines:1">{{item.name}}</text>
                </div>
            </cell>
        </flist>


    </div>


</template>
<style src="./css/style.css"></style>
<style>
    .price_input{
        flex:1;
        height: 70;
        background-color: #f0f2f5;
        border-radius: 5;
        text-align: center;
    }
    .two_mket
    {
        height: 2;
        position: absolute;
        top: 35;
         background-color:#848689;
        right:0;
        left: 20
    }
    .one_mket
    {
        height: 2;
        position: absolute;
        top: 40;
        background-color:#848689;
        right:0;
        left: 20
    }
    .two_a
    {

        background-color: #ffffff;
        margin: 5;
        padding-bottom: 10;
        flex-direction: column;
    }

    .one_a
    {
        flex-direction: row;background-color: #ffffff
    }

    .two_line
    {

    }
    .one_line
    {
        position: absolute;height: 1px;bottom: 0;right:0;width:520;background-color: #dddddd
    }
    .two_count
    {
        position: absolute;
        bottom: 10;
        right:20;
        color:#404040;
        font-size: 25
    }
    .one_count
    {
        position: absolute;bottom: 20;right:20;color:#404040;font-size: 25
    }
    .two_price
    {
        color:#afafaf;
        font-size: 38;
        color:#ff6e4c;

        margin-top: 10;
        margin-left: 10;
    }
    .one_price
    {
        color:#afafaf;
        font-size: 32;
        color:#ff6e4c;
        margin-top: 18;
        margin-left: 10;
    }
    .two_pro
    {
        color:#686868;
        background-color: #f0f2f5;
        margin-left: 10;
        font-size: 28;
        line-height: 30;
        padding-top: 4;
        padding-bottom: 4;
        padding-left: 5;
        padding-right: 5;
        border-radius: 6;

    }
    .one_pro
    {
        color:#686868;
        background-color: #f0f2f5;
        margin-left: 10;
        font-size: 28;
        line-height: 30;
        padding-top: 4;
        padding-bottom: 4;
        padding-left: 5;
        padding-right: 5;
        border-radius: 6;


    }
    .two_name
    {
        margin-left: 10;
        font-size: 28;
        lines:2
    }
    .one_name
    {
        margin-left: 10;
        font-size: 33;

    }
    .two_layout
    {
        flex: 1;
        padding-top: 10;
        padding-right: 5;

    }
    .one_layout
    {
        flex: 1;padding-top: 10;padding-right: 5
    }
    .two_img
    {
        width: 300;
        height: 300;
        margin-top: 10;
        margin-left: 35;

    }
    .one_img
    {
        width: 200;
        height: 200;
        margin-top: 15;

    }
    .text
    {

        font-size: 25;

    }
    .price
    {

        font-size: 35;
        color:red

    }
    .cell_img
    {

        position: absolute;
        left: 0;
        right:0;
        bottom:0;
        top:0;

    }
    .cell_img_layout
    {

        position: absolute;
        left: 0;
        right:0;
        bottom:130;

        top:0;

    }
    .cell
    {
        height:550;
        justify-content: center;
    }


</style>

<script>

    var flist =require('./component/flist.vue')

    const searchbox =require('./component/searchbox.vue')

    const net=require('./util/net.js')
    export default {
        components:{flist,searchbox},
        data: {



            keyword:'冰与火',

            items:[]

        },
        methods: {

            cancelClick()
            {
                var n=weex.requireModule("navigator")
                n.back();
            },
            refresh()
            {
                this.items.length=0;
                this.$refs.list.clear();
                this.load();
            },
            load()
            {
                if(this.keyword=='')
                    return;
                var p={};
                p.keyword=this.keyword
                p.start=this.items.length;
                p.count=20;
                this.$refs.list.load('search.do',p,this.items,(itms)=>{
                    this.items=itms;
                });

            },
            alk()
            {
                var n=weex.requireModule("modal")
                n.toast({message:'ok'})
            },
            gotoDetail(item)
            {
                var n=weex.requireModule("navigator")
                var url='detail.js';
                if(item.isSerial=='0')
                {
                    url='moviedetail.js';
                }
                n.pushParam(url,item)
            },
            getleft(index)
            {
                if(index%3==0)
                {
                    return 15;
                }
                return 7.5;

            },
            getright(index)
            {
                if(index%3==2)
                {
                    return 15;
                }
                return 7.5;

            },
            onreturn:function()
            {
                var modal=weex.requireModule("modal");
                var p=this.keyword;

                if(p=='')
                {
                    modal.toast({message:'请输入关键词!'});
                    return;
                }
                this.$refs.searchbox.blur();
                this.refresh();
            },

            zhitemclick(item,index)
            {
                this.zhitemindex=index;
                this.show_zh=false;
                var p={};
                if(index==1)
                {
                    p.orderType="dateDesc";
                    this.onchoose(p)
                }
                else if(index==2)
                {
                    p.orderType="dateAsc";
                    this.onchoose(p)

                }
                else
                {
                    this.onchoose(p)
                }

            },

            back:function()
            {
                var nav=weex.requireModule("navigator")
                nav.back();
            },
            update: function (e) {

            },
            change(res)
            {
                this.keyword=res;
            },

            itemclick:function()
            {
                var modal=weex.requireModule("modal");
//                modal.toast({message:'ss'})
            },


            getSecondHeight()
            {
                var width= weex.config.env.deviceWidth;
                var deviceHeight= weex.config.env.deviceHeight;
                var height = 750/width*deviceHeight
                return height;
            },
            showFilter:function()
            {

                this.show_filter=false;
                this.maskright=0;
                this.animateMask();
                this.animateFilter();

            }









        }
        ,

        mounted:function()
        {
            var p=  weex.config.env.platform;
            var modal=weex.requireModule("modal");


        },
        created:function(){

            var p=  weex.config.env.platform;
            if(p=='android')
            {
                this.imgtop=10;
            }

            var self=this;
            var globalEvent = weex.requireModule('globalEvent') ;

            globalEvent.addEventListener("onPageInit", function (e) {


                const nav = weex.requireModule('navbar');
                var navigator = weex.requireModule('navigator') ;
                nav.hide();
                nav.setStatusBarStyle('white');
//                self.twocolumn=false;
//                self.$refs.list.showEmpty();
                if(navigator.param()!=undefined)
                {
//                    self.keyword=navigator.param().keyword;
//                    self.search();
                }

 

            });

            globalEvent.addEventListener("viewWillAppear", function (e) {

                const nav = weex.requireModule('navbar');

                nav.hide();
                nav.setStatusBarStyle('white');


            });

            globalEvent.addEventListener("viewWillDisappear", function (e) {

                const nav = weex.requireModule('navbar');



            });


        }
    }
</script>