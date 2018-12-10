const Mixins = {}
let wraper = require('../component/wraper.vue')
let head = require('../busi/component/header.vue')
let flist = require('../busi/component/flist.vue')
let button = require('../component/button.vue')
let page = require('../component/page.vue')
const net =require('../busi/util/net.js')
Vue.prototype.net=net
Mixins.install = (Vue, options) => {
  Vue.mixin({
    components: {wraper, head, button, page,flist},
    data(){
      return {
        modal: {},
        navigator: {},
      }
    },
    methods: {
      toast(msg)
      {
        if (this.modal && this.modal.toast)
          this.modal.toast({message: msg})
      },
      alert(msg)
      {
        this.modal.alert({message: msg})
      },
      push(url, param)
      {
        if (!param)
          this.navigator.push(url)
        else
          this.navigator.pushParam(url, param)
      },
      getScreenHeight() {
        return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
      }


    },
    created()
    {
      this.navigator = weex.requireModule('navigator')
      this.modal = weex.requireModule('modal')
      var globalEvent = weex.requireModule('globalEvent');
      globalEvent.addEventListener("onPageInit", (param) => {
        let p = param
        if (param && p.param && p.bubbles)
          p = p.param
        if (this.onLoad != undefined)
          this.onLoad(p)


      });

    }

  })
}
const install = Mixins.install
export {install}
export  default Mixins