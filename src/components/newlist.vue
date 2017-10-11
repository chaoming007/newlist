<template>
  <div>
    <!-- 列表 start  -->
    
    <div class="news-lists">
       <ul>
         <li v-for="(item,key) in renderDat">
            <a :href="item.url|enCode" >
                <div class="con-box">
                    <h4>{{item.tag|enCode}}</h4>
                    <em>
                        <span>{{item.d}}</span>
                        <span class="name">{{item.aut|enCode}}</span>
                        <span><i :data-comment="item.id"></i>评论</span>
                    </em>
                </div>
                <div class="img-box" v-show="item.image?true:false">
                    <img :src="item.image|enCode" alt="" />
                </div>
            </a>
        </li>
      </ul>
    
      
   </div>
    
  
    <!-- 列表 end   -->
    
    
      
      <!-- 加载更多 start   -->
      
      <Loadmore  v-show="loadShow" />
      
      <!-- 加载更多 end   -->


  </div>
</template>

<script>
import datUrl from '../data/data'
import filterDat from '../filter/filter'
import configDat from '../data/config'
import Loadmore from './loadmore.vue'
export default {
  data () {
    return {
       sendDat:{         //请求的数据
         ts:20140912,
         cs:1660,
         t:configDat.initTab.newclass,   //新闻类别
         size:configDat.initTab.pagenum, //每页数量
         i:configDat.initTab.page
       },  
       renderDat:[],                    //渲染数据
       pages:50,                        //总的数据条数（从后台获得）
       scriptMark:null,
       loadLock:true,
       loadShow:false,
       pageIndex:1 
    }
  },
  methods:{
      getDataFun(num=configDat.initTab.page){    //请求数据
          this.sendDat.i=num;
          console.log(num);
          this.$http.jsonp(datUrl.listUrl,{params:this.sendDat,jsonp:"call"}).then((res)=>{
              if(res.status==200 && res.ok==true && res.body){
                 console.log(res.body);
                 this.renderDat=this.renderDat.concat(res.body);
                 this.loadLock=true;
                 this.loadShow=false;
                 this.pageIndex=num;
                 //this.historyFun(this.pageIndex);
              }
              if(res.body.length==0){
                 this.loadShow=false;
                 this.loadLock=false;
              }
          })
      },
      initRouterFun(){           
          let initParams=this.$route.params||configDat.initTab;
          this.sendDat.t=initParams.newclass;
          this.renderDat=[];
          this.pageIndex=1;
          this.getDataFun();
      },
      commentFun(){        //评论获取方法
        if(this.scriptMark){
          document.body.removeChild(this.scriptMark);  
        }
        this.scriptMark=document.createElement("script");
        this.scriptMark.type="text/javascript";
        this.scriptMark.src=datUrl.commentUrl;
        document.body.appendChild(this.scriptMark);
      },
      loadMoreFun(){
          var $scrollTop=0;
          var $winH=$(window).height();
          var $docH=$(document).height();
          var _this=this;
          $(document).on("scroll",function(){
                 $scrollTop=$(this).scrollTop();
                 $docH=$(document).height();
                 if($scrollTop+$winH>=$docH-$winH/2){
                    if(_this.loadLock){
                        _this.sendDat.i+=1;
                        _this.loadLock=false;
                        _this.loadShow=true;
                        setTimeout(()=>{
                          _this.getDataFun(_this.sendDat.i);
                        },800);
                    }
                 }
          })
      }
      // historyFun(pageIndex){
      //     console.log(this.$route.path);
      //     window.history.pushState({page: pageIndex},null, this.$route.path);  
      // },
      // bindHistoryFun(){
      //     window.addEventListener("popstate", function(event){
      //          var page = 0;
      //          if(event.state !== null){
      //            page = event.state.page;
      //          }
      //          console.log(11111111);
      //     });
      // }
  },
  watch:{
     "$route":"initRouterFun"
  },
  mounted(){
      //this.bindHistoryFun();
      this.initRouterFun();  
      this.loadMoreFun();
    
  },
  updated(){
      this.commentFun();   
  },
  components:{ Loadmore }
}
</script>

<style lang="scss" scoped>
.news-lists .con-box em{ position: relative; margin: 10px 0 0 0;overflow: hidden; display: block;}
</style>
