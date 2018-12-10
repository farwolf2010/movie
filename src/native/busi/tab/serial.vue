<template>
    <wraper style="background-color: #333333" append="tree">
        <head title="电视剧" @titleClick="gotoSearch" :back="false" :isloading="isloading">

        </head>

        <flist ref="list" background="#333333" @start="start" @compelete="compelete" style="flex: 1"  @onscroll="onscroll" columnCount="3" progressTop="500" columnGap="1"  @load="load" @refresh="refresh" emptyTxt="暂无电视剧">
            <div style="background-color: #222222;height: 350" slot="head" ref="head" append="tree">
                <div style="flex-direction: row;margin-top: 30;">
                    <text   :class="[-1==index1? 'cls_sel':'cls']"     @click="item1click(-1,null)">全部</text>
                    <scroller style="flex-direction: row;" bounce="false" scroll-direction="horizontal">
                        <text   :class="[index==index1? 'cls_sel':'cls']" @click="item1click(index,item)"  class="cls" v-for="(item,index) in cls">{{item.name}}</text>
                    </scroller>
                </div>
                <div style="flex-direction: row;margin-top: 30;">
                    <text :class="[-1==index2? 'cls_sel':'cls']"  @click="item2click(-1)">全部</text>
                    <scroller style="flex-direction: row;" bounce="false" scroll-direction="horizontal">
                        <text   :class="[index==index2? 'cls_sel':'cls']"  @click="item2click(index)" v-for="(item,index) in countrys">{{item}}</text>
                    </scroller>
                </div>
                <div style="flex-direction: row;margin-top: 30;">
                    <text :class="[-1==index3? 'cls_sel':'cls']"   @click="item3click(-1)">全部</text>
                    <scroller style="flex-direction: row;" bounce="false" scroll-direction="horizontal">
                        <text   :class="[index==index3? 'cls_sel':'cls']"  @click="item3click(index)" v-for="(item,index) in years"> {{item}} </text>
                    </scroller>
                </div>
                <div style="flex-direction: row;margin-top: 30;">
                    <text :class="[-1==index4? 'cls_sel':'cls']"   @click="item4click(-1)">全部</text>
                    <scroller style="flex-direction: row;" bounce="false" scroll-direction="horizontal">
                        <text   :class="[index==index4? 'cls_sel':'cls']"  @click="item4click(index)" v-for="(item,index) in states"> {{item}} </text>
                    </scroller>
                </div>
            </div>
            <cell slot="cell"  v-for="(item, index) in items" >
                <div  @click="gotoDetail(item)"  style="margin-top: 20; height: 380;align-items:center; " :style="{'margin-left':getleft(index),'margin-right':getright(index)}"  >
                    <div style="position: absolute;left: 0;right: 0;bottom: 50;top: 0;">
                        <image style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;" resize="cover"   placeholder="root:img/default.png" :src="item.img"></image>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;background-color: #000000;opacity: 0.7;position: absolute;bottom: 0;right: 0;border-radius: 0">

                        </div>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text v-if="item.isend==0" style="color: #ffffff;font-size: 28;">至{{item.latestNo}}集</text>
                            <text  v-if="item.isend==1" style="color: #ffffff;font-size: 28;">共{{item.total}}集</text>
                        </div>
                    </div>
                    <text style="color: #ffffff;font-size: 25;position: absolute;left: 0;right: 0;bottom: 0;;text-align: center;lines:1">{{item.name}}</text>
                </div>
            </cell>
        </flist>
          <!--<div @click="totop()"  :style="{'opacity':totopOpacity}" style=" background-color: #333333;width: 80;height: 80;border-radius: 40;position: absolute;right: 10;bottom: 20;justify-content: center;align-items: center">-->
            <!--<image src="root:img/backtotop.png" style="width: 60;height: 60;"></image>-->
          <!--</div>-->
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
        padding-top: 6;

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
        padding-top: 6;

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

                cls:data.getClassData(),
                items:[],
                countrys: ['美国','英国','加拿大','德国','西班牙','法国','墨西哥','澳大利亚','巴西','欧美','俄罗斯','意大利','其它'],
                years:['2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000','1999','1998','1997','1996','1995','1994','1993','1992','1991','1990','1989','1988','1987','1986','1985','1984','1983','1982','1981','1979','1978','1977','1976','1975','1973','1972','1971','1969','1968','1967','1966','1965','1964','1963','1962','1961','1960','1958','1957','1956','1955','1951','1924'],
                states:['连载中','已完结'],
                totopOpacity:0,
                isloading:false
            }
        },
        methods: {
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

                n.pushParam('root:busi/detail.js',item)

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
                     p.type=data.getClassData()[this.index1].id;
                 }
                if(this.index2!=-1)
                {
                    p.country=this.countrys[this.index2];
                }
                if(this.index3!=-1)
                {
                    p.year=this.years[this.index3];
                }
                if(this.index4!=-1)
                {
                    p.isend=this.index4==0?0:1;
                }
                p.isserial=1;
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
        ready:function()
        {



        },

    }
</script>
