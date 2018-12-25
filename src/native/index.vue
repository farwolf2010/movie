<template>
    <div style="">
    </div>
</template>
<script>
  export default{
    props: {},
    data () {
      return {}
    },
    methods: {
      onLoad(){
        let nav=weex.requireModule('navigator')
        nav.presentFull({url:'root:busi/index.js',animated:false},()=>{

        })
      }
    },
    created () {

    }
  }
</script>
<style scoped>
</style>
