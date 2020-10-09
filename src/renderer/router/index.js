import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export const myrouter = [
    {
        path: '/',
        name: 'landing-page',
        redirect: '/find-music',
        component: require('@/views/my-home/my-home').default,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/find-music',
        name: 'find-music',
        component: require('@/views/find-music/find-music').default,
        meta: {
            title: '发现音乐'
        }
    },
    {
        path: '/local-music',
        name: 'local-music',
        component: require('@/views/local-music/local-music').default,
        meta: {
            title: '本地音乐'
        }
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default new Router({
    routes: myrouter,
    base: process.env.BASE_URL
})
