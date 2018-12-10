<template>
    <div>
    </div>
</template>
<script>
  export default{
    props: {},
    data () {
      return {}
    },
    methods: {
      onLoad(p){
        let navbar=weex.requireModule('navbar')
        navbar.setStatusBarStyle('black')
        let nav=weex.requireModule('navigator')
        nav.presentFull({url:'root:busi/index.js',animate:false})

      }
    },
    created () {
    }
  }
</script>
<style scoped>
</style>
