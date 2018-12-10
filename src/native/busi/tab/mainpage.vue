<template>

    <wraper>
        <head title="推荐" @titleClick="gotoSearch" :back="false">

        </head>
      <scroller style="background-color: #333333">
          <div style="flex-direction: row;height: 90;background-color: #444444">
              <div @click="searchClick"   style="width: 710; background-color: #5c616f;height: 55; margin-top: 20;margin-left:20;margin-right20;border-radius: 30;justify-content: center;align-items: center;flex-direction: row">
                  <image src="root:img/search.png"  style="width: 40;height: 40;margin-left: 20"></image>
                  <div  :style="{'margin-top':isandroid()?5:20}"  style="height: 65;padding-left: 1;margin-left: 10;justify-content: center;align-items: center"        >
                      <text style="color: #8d909a;font-size: 30">冰与火</text>
                  </div>
              </div>
          </div>
        <slider class="slider" interval="3000" ref="slider" auto-play="true"  >
            <div @click="gotoBannerDetail(item)"  class="frame" v-for="item in banners" >
                <image class="image" resize="cover"    placeholder="root:img/default.png"  :src="item.banner_img"></image>
            </div>
            <indicator class="indicator"></indicator>
        </slider>
        <div>
            <div style="flex-direction: row">
                <text style="font-size: 33;font-weight: bold;color: #ffffff;margin-left: 20;margin-top: 20" >电视剧</text>
                <div style="flex:1"></div>
                <text style="font-size: 30;font-weight: bold;color: #808080;margin-right: 25;margin-top: 20" @click="gotoserial()" >更多</text>
            </div>

            <scroller scroll-direction="horizontal" show-scrollbar="false" bounce="false" style="width: 750;flex-direction: row;height: 380;margin-top: 10">

                <div   @click="gotoSerialDetail(item)"   v-for="item in serials" style="padding: 0;margin-left: 20;">
                    <div>
                        <image resize="cover" style="width: 220;height: 330" placeholder="root:img/default.png" :src="item.img"></image>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;background-color: #000000;opacity: 0.7;position: absolute;bottom: 0;right: 0;border-radius: 0">

                        </div>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text v-if="item.isend==0" style="color: #ffffff;font-size: 28;">至{{item.latestNo}}集</text>
                            <text  v-if="item.isend==1" style="color: #ffffff;font-size: 28;">共{{item.total}}集</text>
                        </div>
                    </div>
                    <text style="color: #ffffff;font-size: 25;margin-top: 10;text-align: center;max-width: 200">{{item.name}}</text>
                </div>
            </scroller>
        </div>
        <div>
            <div style="flex-direction: row">
                <text style="font-size: 33;font-weight: bold;color: #ffffff;margin-left: 20;margin-top: 20" >电影</text>
                <div style="flex:1"></div>
                <text style="font-size: 30;font-weight: bold;color: #808080;margin-right: 25;margin-top: 20" @click="gotomovie()" >更多</text>
            </div>
            <scroller scroll-direction="horizontal" show-scrollbar="false" bounce="false" style="width: 750;flex-direction: row;height: 380;margin-top: 10">
                <div    @click="gotoFilmDetail(item)" v-for="item in films" style="padding: 0;margin-left: 20;">
                    <div>
                        <image style="width: 220;height: 330"  placeholder="root:img/default.png" :src="item.img"></image>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;background-color: #000000;opacity: 0.7;position: absolute;bottom: 0;right: 0;border-radius: 0">

                        </div>
                        <div style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text   style="color: #ffffff;font-size: 28;">{{item.sharpName}}</text>

                        </div>
                    </div>
                    <text style="color: #ffffff;font-size: 25;margin-top: 10;text-align: center;max-width: 200;">{{item.name}}</text>
                </div>
            </scroller>
        </div>


    </scroller>
    </wraper>
</template>
<style src="../css/style.css"></style>
<style  >
    .indicator
    {
        width:750px;
        height:316px;
        position:absolute;
        item-color:#777777;
        item-selected-color:#ffffff;
        item-size:20px;
        top:120px;
        left:1;
    }
    .slider{width:750px;height:316px;}
    .frame{width:750px;height:316px;position:relative;}

    .image{width:750px;height:316px;}

</style>
<script>
    const searchbox =require('../component/searchbox.vue')
    export default {
        components:{searchbox},
        data () {
            return {

                serials:[

                ],
                films:[

                ],
                banners: [
                    { img: 'https://r1.ykimg.com/0510000059675180ADC0B0B35B056543'},
                    { img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503206028&di=36e9b5f41a2fe5cde117834c3166187c&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.nhaowan.com%2Fuploadfile%2F2014%2F1201%2F20141201050553256.jpg'},
                    { img: 'https://r1.ykimg.com/0510000059671128AD9E07523604E53A'},
                    { img: 'https://r1.ykimg.com/05100000595E602EADC0B0ADA707B70A'}
                ],
                searchtop:20



            }
        },
        methods: {
            gotoserial()
            {
                 var notify=weex.requireModule("notify");
                 notify.send('tabselect',{index:1});
            },
            gotomovie()
            {
                var notify=weex.requireModule("notify");
                notify.send('tabselect',{index:2});
            },
            gotoBannerDetail(item)
            {

                var url='root:busi/detail.js';
                if(item.isSerial=='0')
                {
                    url='root:busi/moviedetail.js';
                }
                this.push(url,item)
            },
            gotoSerialDetail(item)
            {
              this.push('root:busi/detail.js',item)
            },
            gotoFilmDetail(item)
            {
              this.push('root:busi/moviedetail.js',item)
            },
            searchClick()
            {
              this.push('root:busi/searchList.js',{keyword:'梅'})
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
            isandroid()
            {
               return weex.config.env.platform=='android'
            },

            load()
            {
                var p={};
                var pref=weex.requireModule("pref")
                var r=  pref.get('mainpagestr')
                if(r==undefined||r=='')
                {
                   r={"msg":"成功","films":[{"id":32715,"name":"帅气的恶魔 Handsome Devil","img":"http://img.hdwan.net/2017/08/p2455528649.jpg","star":null,"type":42,"total":null,"latestNo":null,"time":"2017-08-09 14:00:04","isend":null,"sharp":2,"country":" 爱尔兰","typeName":"剧情","sharpName":"HD"},{"id":32709,"name":"鸟鸣720P","img":"http://img.hdwan.net/2014/06/e611_Birdsong.720P.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"},{"id":32708,"name":"反抗军","img":"http://img.hdwan.net/2014/06/4dd5_Defiance.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"},{"id":32707,"name":"帝国陷落","img":"http://img.hdwan.net/2014/06/eb69_The-Downfall.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"},{"id":32706,"name":"太阳帝国","img":"http://img.hdwan.net/2014/06/64be_Empire-of-the-Sun.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"},{"id":32705,"name":"不列颠之战","img":"http://img.hdwan.net/2014/06/03de_Battle-of-Britain.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"},{"id":32704,"name":"决战斯大林格勒","img":"http://img.hdwan.net/2014/06/335f_Stalingrad.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"},{"id":32703,"name":"细细的红线","img":"http://img.hdwan.net/2014/06/2271_The-Thin-Red-Line.jpg","star":"","type":46,"total":0,"latestNo":"0","time":"2016-11-30 00:00:00","isend":0,"sharp":2,"country":"","typeName":"战争","sharpName":"HD"}],"serials":[{"id":25832,"name":"逆转奇兵第四季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-6/p2457000333.jpg","star":null,"type":21,"total":10,"latestNo":"9","time":"2017-08-10 10:00:00","isend":0,"sharp":2,"country":"美国","typeName":"战争","sharpName":"HD"},{"id":28215,"name":"摇滚学校第三季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-8/b_840f9c909d4f903f46f5e5bcc85edd1b.jpg","star":null,"type":18,"total":-1,"latestNo":"3","time":"2017-08-10 09:00:02","isend":0,"sharp":2,"country":"美国","typeName":"歌舞","sharpName":"HD"},{"id":28180,"name":"生死狙击第二季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-7/p2493379674.jpg","star":null,"type":35,"total":10,"latestNo":"4","time":"2017-08-10 09:00:02","isend":0,"sharp":2,"country":"美国","typeName":"动作","sharpName":"HD"},{"id":28178,"name":"神秘礼物第一季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-7/b_8ac96d3ae3f7e0dbde4a562030d4a256.jpg","star":null,"type":13,"total":10,"latestNo":"4","time":"2017-08-10 09:00:02","isend":0,"sharp":2,"country":"美国","typeName":"罪案","sharpName":"HD"},{"id":28159,"name":"青年莎士比亚第一季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-7/aefee074550cb9a4d754e70851c449a9.jpg","star":null,"type":36,"total":10,"latestNo":"7","time":"2017-08-10 09:00:02","isend":0,"sharp":2,"country":"美国","typeName":"剧情","sharpName":"HD"},{"id":28179,"name":"如此一家人第五季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-7/b_6e71dd701afb7d620ec4574b9289602d.jpg","star":null,"type":6,"total":20,"latestNo":"5","time":"2017-08-10 09:00:01","isend":0,"sharp":2,"country":"美国","typeName":"青春","sharpName":"HD"},{"id":28203,"name":"侦探双雄第一季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-8/p2494297355.jpg","star":null,"type":35,"total":6,"latestNo":"5","time":"2017-08-10 09:00:01","isend":1,"sharp":2,"country":"美国","typeName":"动作","sharpName":"HD"},{"id":28211,"name":"哈啦夏令营第二季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-8/p2492742007.jpg","star":null,"type":27,"total":8,"latestNo":"4","time":"2017-08-10 09:00:00","isend":0,"sharp":2,"country":"美国","typeName":"喜剧","sharpName":"HD"}],"err":0,"banners":[{"id":28044,"name":"冰与火之歌第七季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-3/p2389329131.jpg","star":null,"type":5,"total":7,"latestNo":"4","time":"2017-08-07 18:00:00","isend":0,"sharp":2,"isSerial":1,"country":"美国","banner_img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503206028&di=36e9b5f41a2fe5cde117834c3166187c&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.nhaowan.com%2Fuploadfile%2F2014%2F1201%2F20141201050553256.jpg","typeName":"魔幻","sharpName":"HD"},{"id":26373,"name":"地球百子第四季","img":"http://img.kukan5.com:808/pic/uploadimg/2017-2/001861c36e05205b461815337cd77d4f.jpg","star":null,"type":15,"total":13,"latestNo":"13","time":"2017-07-22 17:07:57","isend":1,"sharp":2,"isSerial":1,"country":"美国","banner_img":"https://timgsa.baidu.com/timg?image&quality=100&size=b9999_10000&sec=1502611585798&di=6bc9e6062496e88106c5831f4715a8a8&imgtype=0&src=http%3A%2F%2Fcdn.iciba.com%2Fnews%2F2014%2F0821%2F20140821023015617.jpg","typeName":"科幻","sharpName":"HD"},{"id":26424,"name":"太空无垠第一季","img":"http://img.kukan5.com:808/pic/uploadimg/2016-11/p2276966687.jpg","star":null,"type":15,"total":10,"latestNo":"10","time":"2017-07-22 17:07:59","isend":1,"sharp":2,"isSerial":1,"country":"美国","banner_img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502611668507&di=15ae77107e21c9d5aae9939f124f17fb&imgtype=0&src=http%3A%2F%2Fimg0.178.com%2Fnewgame%2F201605%2F258328385035%2F258329155164.jpg","typeName":"科幻","sharpName":"HD"}]}
                }
                this.banners=r.banners;
                this.films=r.films;
                this.serials=r.serials
                this.net.postSilent('recommand.do',p,(res)=>{

                    pref.set('mainpagestr',res);
                    this.banner=res.banners;
                    this.films=res.films;
                    this.serials=res.serials;

                })


            },
          onLoad(){
            this.load();
          }


        },




        created:function(){




        },
        ready:function()
        {



        },

    }
</script>
