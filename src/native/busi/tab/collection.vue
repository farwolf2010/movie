<template>

    <wraper style="background-color: #333333" append="tree">
        <head @rightClick="del" title="关注" :back="false">
            <text :style="{'margin-top':isOs43()?5:25}"
                  style="margin-top: 25;color: #ffffff;margin-left:80;font-size: 30" slot="right">
                {{!editmode ? '删除' : '完成'}}
            </text>

        </head>

        <flist ref="list" background="#333333" style="flex: 1" columnCount="3" progressTop="500" columnGap="1"
               @load="load" @refresh="refresh" emptyTxt="没有收藏！">

            <cell slot="cell" v-for="(item, index) in items">
                <div @click="gotoDetail(item)" style="margin-top: 20; height: 380;align-items:center "
                     :style="{'margin-left':getleft(index),'margin-right':getright(index)}">
                    <div style="position: absolute;left: 0;right: 0;bottom: 50;top: 0;">
                        <image style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;" resize="cover"
                               placeholder="root:img/default.png" :src="item.img"></image>

                        <div style="align-items: center;justify-content: center; width: 100;height: 50;background-color: #000000;opacity: 0.7;position: absolute;bottom: 0;right: 0;border-radius: 0">

                        </div>
                        <div v-if="item.isSerial==0"
                             style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text style="color: #ffffff;font-size: 28;">{{item.sharpName}}</text>

                        </div>
                        <div v-if="item.isSerial==1"
                             style="align-items: center;justify-content: center; width: 100;height: 50;;position: absolute;bottom: 0;right: 0;border-radius: 0">
                            <text v-if="item.isend==0" style="color: #ffffff;font-size: 28;">至{{item.latestNo}}集</text>
                            <text v-if="item.isend==1" style="color: #ffffff;font-size: 28;">共{{item.total}}集</text>
                        </div>
                    </div>
                    <text style="color: #ffffff;font-size: 25;text-align: center;lines:1;position: absolute;left: 0;right: 0;bottom: 0;">{{item.name}}</text>



                    <check :style="{'visibility':editmode?'visible':'hidden'}" @change="checkchange" :item="item"
                           :ischeck="item.isselect"
                           style="position: absolute;top: -20;right: -20;width: 100;height: 100;"></check>
                </div>
            </cell>
        </flist>
    </wraper>

</template>
<style src="../css/style.css"></style>
<style>
    .price_input {
        flex: 1;
        height: 70;
        background-color: #f0f2f5;
        border-radius: 5;
        text-align: center;
    }

    .two_mket {
        height: 2;
        position: absolute;
        top: 35;
        background-color: #848689;
        right: 0;
        left: 20
    }

    .one_mket {
        height: 2;
        position: absolute;
        top: 40;
        background-color: #848689;
        right: 0;
        left: 20
    }

    .two_a {

        background-color: #ffffff;
        margin: 5;
        padding-bottom: 10;
        flex-direction: column;
    }

    .one_a {
        flex-direction: row;
        background-color: #ffffff
    }

    .two_line {

    }

    .one_line {
        position: absolute;
        height: 1px;
        bottom: 0;
        right: 0;
        width: 520;
        background-color: #dddddd
    }

    .two_count {
        position: absolute;
        bottom: 10;
        right: 20;
        color: #404040;
        font-size: 25
    }

    .one_count {
        position: absolute;
        bottom: 20;
        right: 20;
        color: #404040;
        font-size: 25
    }

    .two_price {
        color: #afafaf;
        font-size: 38;
        color: #ff6e4c;

        margin-top: 10;
        margin-left: 10;
    }

    .one_price {
        color: #afafaf;
        font-size: 32;
        color: #ff6e4c;
        margin-top: 18;
        margin-left: 10;
    }

    .two_pro {
        color: #686868;
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

    .one_pro {
        color: #686868;
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

    .two_name {
        margin-left: 10;
        font-size: 28;
        lines: 2
    }

    .one_name {
        margin-left: 10;
        font-size: 33;

    }

    .two_layout {
        flex: 1;
        padding-top: 10;
        padding-right: 5;

    }

    .one_layout {
        flex: 1;
        padding-top: 10;
        padding-right: 5
    }

    .two_img {
        width: 300;
        height: 300;
        margin-top: 10;
        margin-left: 35;

    }

    .one_img {
        width: 200;
        height: 200;
        margin-top: 15;

    }

    .text {

        font-size: 25;

    }

    .price {

        font-size: 35;
        color: red

    }

    .cell_img {

        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;

    }

    .cell_img_layout {

        position: absolute;
        left: 0;
        right: 0;
        bottom: 130;

        top: 0;

    }

    .cell {
        height: 550;
        justify-content: center;
    }

</style>
<script>
    var flist = require('../component/flist.vue')
    var head = require('../component/header.vue')
    var check = require('../component/check.vue')
    const login = require('../util/login.js')
    const net = require('../util/net.js')
    export default {
        components: {flist, head, check},
        data () {
            return {


                items: [],
                editmode: false,


            }
        },
        methods: {
            isOs43()
            {
                if (weex.config.env.platform == 'android') {
//                    if(weex.config.env.osVersion=)
                    var p = weex.config.env.osVersion
                    p = p.replace(/\./g, '')
                    if (p.length < 3)
                        p = p + "0";
                    if (p <= '440') {
                        return true
                    }
                    return false;
                }
                return false;

            },
            checkchange(p)
            {
                p.item.isselect = p.check;
            },
            del()
            {

                if (this.editmode) {
                    var s = "";
                    for (let i = 0; i < this.items.length; i++) {
                        var p = this.items[i]
                        if (p.isselect)
                            s += p.id + ","
                    }
                    var reg = new RegExp(',' + "$");
                    if (reg.test(s)) {
                        s = s.substr(0, s.length - 1);
                    }
                    if (s == '') {
                        this.editmode = false;
                        return;

                    }

                    var p = {};
                    p.ids = s;
                    net.post('auth/collect/delete.do', p, (res) => {

                        var modal = weex.requireModule("modal")
                        modal.toast({message: '删除成功!'})
                        this.refresh();
                        this.editmode = false;
                    })

                }
                else {
                    this.editmode = true;
                }

            },
            cancelClick()
            {
                var n = weex.requireModule("navigator")
                n.back();
            },
            refresh()
            {
                this.items.length = 0;
                this.$refs.list.clear();
                this.load();
            },
            load()
            {
                var p = {};
                p.start = this.items.length;
                p.count = 20;
                this.$refs.list.load('auth/collections.do', p, this.items, (itms) => {
                    for (let i = 0; i < itms.length; i++) {
                        itms[i].isselect = false;
                    }
                    this.items = itms;
                });

            },
            alk()
            {
                var n = weex.requireModule("modal")
                n.toast({message: 'ok'})
            },
            gotoDetail(item)
            {
                if (this.editmode)
                    return;
                var n = weex.requireModule("navigator")
                var url = 'root:busi/detail.js';
                if (item.isSerial == '0') {
                    url = 'root:busi/moviedetail.js';
                }
                n.pushParam(url, item)
            },
            getleft(index)
            {
                if (index % 3 == 0) {
                    return 15;
                }
                return 7.5;

            },
            getright(index)
            {
                if (index % 3 == 2) {
                    return 15;
                }
                return 7.5;

            },
            onreturn: function () {
                var modal = weex.requireModule("modal");
                var p = this.keyword;

                if (p == '') {
                    modal.toast({message: '请输入关键词!'});
                    return;
                }
                this.$refs.searchbox.blur();
                this.refresh();
            },

            zhitemclick(item, index)
            {
                this.zhitemindex = index;
                this.show_zh = false;
                var p = {};
                if (index == 1) {
                    p.orderType = "dateDesc";
                    this.onchoose(p)
                }
                else if (index == 2) {
                    p.orderType = "dateAsc";
                    this.onchoose(p)

                }
                else {
                    this.onchoose(p)
                }

            },

            back: function () {
                var nav = weex.requireModule("navigator")
                nav.back();
            },
            update: function (e) {

            },
            change(res)
            {
                this.keyword = res;
            },

            itemclick: function () {
                var modal = weex.requireModule("modal");
//                modal.toast({message:'ss'})
            },


            getSecondHeight()
            {
                var width = weex.config.env.deviceWidth;
                var deviceHeight = weex.config.env.deviceHeight;
                var height = 750 / width * deviceHeight
                return height;
            },


        },

        created: function () {

            var notify = weex.requireModule("notify")
            notify.regist('login', function () {
//                    modal.toast({message:'接到通知'})
                self.refresh();

            })

            notify.regist('collectionrefrsh', function () {
//                    modal.toast({message:'接到通知'})
                self.refresh();

            })
            var globalEvent = weex.requireModule('globalEvent');
            var self = this;
            globalEvent.addEventListener("onPageInit", function (e) {


                var modal = weex.requireModule('modal')


            });

        },
        ready: function () {


        },

    }
</script>
