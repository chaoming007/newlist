import VueRouter from 'vue-router'
import routes from './router.config'
export default new VueRouter({
     history: true,
     mode: 'history',
     saveScrollPosition: true,
    routes
})
