import Listnew from '../components/newlist.vue'
export default[
     {
       path:"/:newclass",
       name:"sikedayetihaiwai",
       component:Listnew
     },
     {
       path:'*',
       redirect:'/xinwen'
     }
]
