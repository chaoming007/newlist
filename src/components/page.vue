<template>
  <div>
    <!-- 分页 start  -->
    
            <div class="m-pages">
             <a href="javascript:;" class="m-pages-pre" :class="{'m-pages-none':hasPrev}" @click="prevFun(-1)">上一页</a>
             <div class="m-pages-num">
                 <div class="m-pages-num-con">{{currentPage}}/{{getPageNum()}}</div>
                 <div class="m-pages-num-arrow"></div>
             </div>
             <select @change="selectPageFun"">
                 <option v-for="(item,key) in pagenum" :value=item  >{{item}}</option>
             </select>
             <a href="javascript:;" class="m-pages-next" :class="{'m-pages-none':hasNext}" @click="nextFun(1)">下一页</a>
            </div>
    
    <!-- 分页 end   -->

  </div>
</template>

<script>

export default {
  data () {
    return {
         pagenum:[],        //页数数组
         currentPage:1,      //当前页数
         hasPrev:false,
         hasNext:false
    }
  },
  props: {
      pages:{             //总条目数
        type: Number,
        default:5
      },
      size:{             //每页显示条目数
        type: Number,
        default:5
      }
  },
  methods:{
       getPageNum(){                   //获得总页数
           return Math.ceil(this.pages/this.size);
       },
       setPageNum(){
           for(let i=1;i<=this.getPageNum();i++){
               this.pagenum.push(i);
           }
       },
       routerFun(num){
            var  initParams=this.$route.params;
            var  initNum=parseInt(initParams.page);
            if(num!=0){
                initNum=initNum+num;
            }
            if(initNum>this.getPageNum()){
               initNum=this.getPageNum();
            }
            if(initNum<1){
               initNum=1;
            }
            this.setClassFun(initNum);
            this.currentPage=initNum;
            this.turnRouterFun();
       },
       setClassFun(num){
           if(num>this.getPageNum()-1){
             this.hasNext=true;
           }else{
             this.hasNext=false;
           }
           if(num<2){
              this.hasPrev=true;
           }else{
              this.hasPrev=false;
           }
       },
       prevFun(num){         //上一页
           this.routerFun(num);
       },
       nextFun(num){        //下一页
           this.routerFun(num);
       },
       selectPageFun(el){               //选择页数         
           this.currentPage=el.target.value;
           this.setClassFun(this.currentPage);
           this.turnRouterFun();
       },
       turnRouterFun(){
          this.$router.push({path: '/' + this.$route.params.newclass+'/'+this.currentPage})
       },
       getCurrentPage(){
           this.currentPage=this.$route.params.page;
           this.setClassFun(this.currentPage);
       }
  },
  watch:{
     "$route":"getCurrentPage"
  },
  mounted(){ 
     this.setPageNum();
     this.routerFun(0);
  }
  
}
</script>
