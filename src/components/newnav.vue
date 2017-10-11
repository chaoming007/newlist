<template>
  <div>
    <!-- 导航 start   -->
    
      <div class="sub-tags">
          <ul>
              <li v-for="(item,key) in navArr" :class="{'current':(currentTab==item.link)}">
                  <router-link  :to="{ name: 'sikedayetihaiwai',params:{ newclass:item.link }}">
                       <span>{{item.title}}</span>
                  </router-link>
              </li>
          
          </ul>
     </div>
     
    <!-- 导航 end   -->

  </div>
</template>

<script>
import configDat from '../data/config'
export default {
  data () {
    return {
        currentTab:null,
        navArr:configDat.navArr
    }
  },
  methods:{
      getNavFun(){
          this.currentTab=this.$route.params.newclass;
      }
  },
  watch:{
    "$route":"getNavFun"
  },
  mounted(){
     this.getNavFun();
  }
}
</script>

<style lang="scss" scoped>
.sub-tags { height: 40px;line-height: 40px;background: #F5F5F5;font-size: 1.4rem;
  ul {padding: 0 0 0 20px}
  li {float: left;width: 14%;
    a {color: #828282;display: block}
    &:last-child{ margin: 0}
  }
  li.current a {color: #598bdd}
  .router-link-active{color: #598bdd}
}
</style>
