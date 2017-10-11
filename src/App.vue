<template>
  <div>
       <Newheader/>
       <Newnav />
       <keep-alive>
          <router-view></router-view>
       </keep-alive>
       <Newfooter/>
  </div>
</template>

<script>
import Newheader from './components/newheader.vue'
import Newfooter from './components/newfooter.vue'
import Listnew from './components/newlist.vue'
import Newnav from './components/newnav.vue'
export default {
  components:{
     Newheader,
     Newfooter,
     Listnew,
     Newnav
  }
}
</script>
