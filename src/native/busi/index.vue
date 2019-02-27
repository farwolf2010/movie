<template>
    <div style="flex: 1;">

        <host :page="index"  style="flex: 1">
           <mainpage></mainpage>
           <serial></serial>
           <movie></movie>
           <collection></collection>
        </host>
        <div style="height: 110px;width: 750px;flex-direction: row;background-color: #1c1b1b">

            <tabitem @change="change" :index="0" :currentIndex="index"   class="tabitem" text="推荐" img="root:img/tab1_unselect.png"
                     selectImg="root:img/tab1_select.png" color="#666666" selectColor="#1296db">

            </tabitem>
            <tabitem @change="change" :index="1"  :currentIndex="index"  class="tabitem" text="电视剧" img="root:img/tab2_unselect.png"
                     selectImg="root:img/tab2_select.png" color="#666666" selectColor="#1296db">

            </tabitem>
            <tabitem @change="change" :index="2"  :currentIndex="index"   class="tabitem" text="电影" img="root:img/tab3_unselect.png"
                     selectImg="root:img/tab3_select.png" color="#666666" selectColor="#1296db">

            </tabitem>
            <tabitem @change="change" :index="3"  :currentIndex="index"   class="tabitem" text="收藏" img="root:img/tab4_unselect.png"
                     selectImg="root:img/tab4_select.png" color="#666666" selectColor="#1296db">

            </tabitem>

        </div>

    </div>
</template>

<style>


    .tabitem {
        flex: 1;
    }
</style>

<script>
    var tabitem = require('./component/tabitem.vue')
    var mainpage = require('./tab/mainpage.vue')
    var collection = require('./tab/collection.vue')
    var movie = require('./tab/movie.vue')
    var serial = require('./tab/serial.vue')
    export default {
        components: {tabitem,mainpage,collection,movie,serial},
        data(){
          return {
            index: 0
          }
        },

        methods: {
            update: function (e) {
                this.target = 'Weex'
                console.log('target:', this.target)
            },
            change(i)
            {
                if(i==3)
                {
                    var st=weex.requireModule("static")
                    var usr=st.get('user');
                    if(usr==undefined||usr=='')
                    {
                        var nav=weex.requireModule("navigator")
                        nav.present('account/login.js')
                        return;
                    }
                }
                this.index = i;
            },
            firstviewadd()
            {
                this.viewadd=true;
            },
            show()
            {
                var modal = weex.requireModule("modal")
                var p = weex.config.env.osVersion
                p = p.replace(/\./g, '')
                modal.alert({message: p})
            }
        }
        ,


        created: function () {


            var notify=weex.requireModule("notify")
            notify.regist('tabselect',(e)=>{
                this.index=e.index;
            })

            var globalEvent = weex.requireModule('globalEvent');
            var self = this;
            globalEvent.addEventListener("onPageInit", function (e) {
              var page=weex.requireModule("page")
                page.doubleBack();
              var navbar=weex.requireModule("navbar")
                navbar.setStatusBarStyle('white')
                var nav=weex.requireModule("navigator")
                nav.enableBackGesture()
            });

            globalEvent.addEventListener("viewWillAppear", function (e) {
                const nav = weex.requireModule('navbar');
                nav.setStatusBarStyle('white');
            });

        },
    }
</script>