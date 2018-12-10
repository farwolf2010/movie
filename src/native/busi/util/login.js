
let login= {

      login :function(user,pass,comp) {

      var net =require('./net.js')
      net.post('login.do',{name:user,pass:pass},function (e) {

        var st = weex.requireModule('static') ;


          st.set('user',e.user);

          st.setString('token',e.user.token);
          comp(e);

    });

      },
    checkDo:function(success)
    {
        var navigator = weex.requireModule('navigator') ;
        navigator.present('root:busi/account/login.js',{},'transparent',true,function(){
            success();
        },true);
    },
    isLogin:function()
    {
        var st = weex.requireModule('static') ;
        var usr =st.get('user')
        // var modal=weex.requireModule('modal');
        // modal.toast({message:usr})
        if(usr!=undefined&&usr!='')
            return true;
        return false;
    }

}
module.exports=login
