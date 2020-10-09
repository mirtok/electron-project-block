<template>
    <div id="app">
        <MyHeader />
        <section class="container">
            <div class="left-menu">
                <MySide />
            </div>
            <div class="right-content">
                <router-view></router-view>
            </div>
        </section>
        <MyPlayer />
    </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader'
import MySide from '@/components/MySide/MySide'
import MyPlayer from '@/components/MyPlayer/MyPlayer'
import { remote } from 'electron'
export default {
    name: 'my-project',
    components: {
        MyHeader,
        MySide,
        MyPlayer
    },
    mounted() {
        const win = remote.getCurrentWindow()
        const container = document.getElementById('app')
        container.style.maxWidth = win.getContentSize()[0] + 'px'
        container.style.maxHeight = win.getContentSize()[1] + 'px'
        window.onresize = function (e) {
            const innWeight = e.target.innerWidth
            const innerHeight = e.target.innerHeight
            container.style.maxWidth = innWeight + 'px'
            container.style.maxHeight = innerHeight + 'px'
        }
    }
}
</script>

<style lang="css">
@import url('~@/assets/css/reset.css');
.e-text-right {
    text-align: right;
}
.e-text-left {
    text-align: left;
}
.e-text-center {
    text-align: center;
}
.container {
    display: flex;
    height: calc(100vh - 120px);
}
.right-content {
    width: 100%;
    height: calc(100vh - 120px);
    overflow-y: auto;
    overflow-x: hidden;
}
.right-content::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
.right-content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #e1e1e2;
    -webkit-box-shadow: inset 0 0 5px#E1E1E2;
}
.right-content::-webkit-scrollbar-track {
    border-radius: 0;
    background: ffffff;
    -webkit-box-shadow: inset 0 0 5px #e1e1e2;
}
</style>
