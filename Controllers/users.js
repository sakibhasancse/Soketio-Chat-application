'use strict'

module.exports = function (_){
   return {

       setRouter:function(router){
           router.get('/' ,this.indexPage )      
        },
        indexPage:function(req,res){
            return res.render('feed/index' ,{title:'Chat application'})

        }
}

}