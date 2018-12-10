<template>
    <wraper style="background-color: #333333" append="tree">
        <head title="电影" @titleClick="gotoSearch" :back="false" :isloading="isloading">

        </head>
        <div style="background-color: #222222;height: 190" slot="head" ref="head">
            <div style="flex-direction: row;margin-top: 30;">
                <text   :class="[-1==index1? 'cls_sel':'cls']"  style="font-size: 32"  @click="item1click(-1,null)">全部</text>
                <scroller style="flex-direction: row;" bounce="false" scroll-direction="horizontal">
                    <text   :class="[index==index1? 'cls_sel':'cls']" @click="item1click(index)"  class="cls" v-for="(item,index) in cls">{{item.name}}</text>
                </scroller>
            </div>
            <div style="flex-direction: row;margin-top: 30;">
                <text :class="[-1==index2? 'cls_sel':'cls']"  @click="item2click(-1)">全部</text>
                <scroller style="flex-direction: row;" bounce="false" scroll-direction="horizontal">
                    <text   :class="[index==index2? 'cls_sel':'cls']"  @click="item2click(index)" v-for="(item,index) in sharps">{{item.name}}</text>
                </scroller>
            </div>

        </div>
        <flist ref="list" background="#333333" @start="start" @compelete="compelete" style="flex: 1"  @onscroll="onscroll" :columnCount="3" progressTop="500" columnGap="1"  @load="load" @refresh="refresh" emptyTxt="暂无电视剧">
            <cell slot="cell"  v-for="(item, index) in items" >
                <div  @click="gotoDetail(item)"  style="margin-top: 20; height: 380;align-items:center; " :style="{'margin-left':getleft(index),'margin-right':getright(index)}"  >
                    <div style="position: absolute;left: 0;right: 0;bottom: 50;top: 0;">
                        <image style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;" resize="cover"   placeholder="root:img/default.png" :src="item.img"></image>
                        <div  style="align-items: center;justify-content: center; width: 100;height: 50;background-color: #000000;opacity: 0.7;position: absolute;bottom: 0;right: 0;border-radius: 0">
                        </div>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text   style="color: #ffffff;font-size: 28;">{{item.sharpName}}</text>
                        </div>
                    </div>
                    <text style="color: #ffffff;font-size: 25;position: absolute;left: 0;right: 0;bottom: 0;;text-align: center;lines:1">{{item.name}}</text>
                </div>
            </cell>
        </flist>

        <image @click="totop()"  :style="{'opacity':totopOpacity}"  src="root:img/backtotop.png" style="width: 80;height: 80;position: absolute;right: 20;bottom: 20;"></image>

        <div>

        </div>

    </wraper>
</template>
<style src="../css/style.css"></style>
<style  >

    .cls_sel
    {

        height: 50;
        margin-left: 20;
        background-color: #1296db;
        border-radius: 10;
        padding-left: 10;
        padding-right: 10;
        color: #ffffff;
        text-align: center;
        padding-top: 3;
        font-size: 32;
        align-items: center;
        justify-content: center;
    }

    .cls
    {

        height: 50;
        margin-left: 20;
        padding-left: 10;
        padding-right: 10;
        color: #ffffff;
        text-align: center;
        padding-top: 3;
        font-size: 32;
    }


</style>
<script>
    var head =require('../component/header.vue')
    var flist =require('../component/flist.vue')
    var data =require('../util/data.js')
    var net =require('../util/net.js')
    export default {
        components:{flist,head},
        data () {
            return {

                index1:-1,
                index2:-1,
                index3:-1,
                index4:-1,

                cls:data.getMovieClassData(),
                items:[],
                sharps:[{name:'枪版',value:0},{name:'清晰枪版',value:1},{name:'高清',value:2}],
                totopOpacity:0,
                isloading:false
            }
        },
        methods: {
            getBg(sharp)
            {
                if(sharp==0)
                {
                   return "#9a3016";
                }
                else if(sharp==1)
                {
                    return "#ebba3d";
                }
                else if(sharp==2)
                {
                    return "#83d23a";
                }

            },
            start()
            {
                if(this.items.length>0)
                    this.isloading=true
            },
            compelete()
            {
                this.isloading=false
            },
            onscroll(e)
            {
                var y= e.contentOffset.y*-1;
                var t= y/700
                if(t>1.0)
                    t=1;
                this.totopOpacity=t;
            },
            totop()
            {
                const dom = weex.requireModule('dom')
                dom.scrollToElement(this.$refs.head, {})
            },
            gotoSearch()
            {
                var n=weex.requireModule("navigator")
                n.pushParam('root:busi/searchList.js',{keyword:'梅'})
            },
            gotoDetail(item)
            {
                var n=weex.requireModule("navigator")
                n.pushParam('root:busi/moviedetail.js',item)
            },
            load()
            {

                var p=this.getparam();
                p.start=this.items.length;
                p.count=20;
                this.$refs.list.load('movie.do',p,this.items,(itms)=>{
                    this.items=itms;
                });

            },

            getparam()
            {
                var p={};
                if(this.index1!=-1)
                {
                    p.type=data.getMovieClassData()[this.index1].id;
                }
                if(this.index2!=-1)
                {
                    p.sharp=this.sharps[this.index2].value;
                }
                p.isserial=0;

                return p;

            },
            refresh()
            {
                this.items.length=0;
                this.$refs.list.clear();
                this.load();
            },
            item1click(index,item)
            {
                this.index1=index;
                this.refresh()
            },
            item2click(index)
            {
                this.index2=index;
                this.refresh()
            },
            item3click(index)
            {
                this.index3=index;
                this.refresh()
            },
            item4click(index)
            {
                this.index4=index;
                this.refresh()
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
            oninput(e)
            {

//                this.$emit('oninput');
                this.$emit('oninput', e);
                this.visiable=e.value!='';


            },
            onclick()
            {
                if(!this.disabled)
                    this.$emit('onclick');
            },
            panstart()
            {
                if(!this.disabled)
                    this.bgcolor='#ff1b08'
            },
            panend()
            {
                if(!this.disabled)
                    this.bgcolor='#ff4800'
            },
            setenable()
            {

            },


            onclose()
            {
                this.value='';
            }


        },

        created:function(){


            var globalEvent = weex.requireModule('globalEvent') ;
            globalEvent.addEventListener("onPageInit", function (e) {




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
