import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import PostFeed from '../views/Posts.vue'
import Posted from '../views/Post.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/Posts',
        name: 'Posts',
        props: true,
        component: PostFeed
    },
    {
        path: '/Post',
        name: 'Post',
        props: true,
        component: Posted
    },
    {
        path: '/Account',
        name: 'Account',
        component: Account
    }
]

const scrollBehavior = function(to) {
    if (to.hash) {
        return {
            selector: to.hash
        }
    }
}

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/Signup'];
    const userID = sessionStorage.getItem('userID');
    const authRequired = !publicPages.includes(to.path);
    if(authRequired && !userID){
        return next('/');
    }
    next();
});

export default router;