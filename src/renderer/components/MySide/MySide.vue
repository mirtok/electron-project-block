<template>
    <div class="container-side">
        <div class="menu-box">
            <p class="recommend">推荐</p>
            <div class="menu-list">
                <div
                    :class="{
                        'menu-item': true,
                        'item-active': currentIndex === index
                    }"
                    v-for="(item, index) in sideList"
                    :key="index"
                    @click="pageSwitch(index,item.url)"
                >
                    <span :class="item.icon"></span>
                    <span class="icon-name">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            sideList: [
                {name: '发现音乐',url: '/find-music',icon: 'iconfont icon-yinyue'},
                {name: '本地音乐',url: '/local-music',icon: 'iconfont icon-yinle'},
                // {name: '下载音乐',url: '/',icon: 'iconfont icon-xiazai'},
                // {name: '喜欢的音乐',url: '/',icon: 'iconfont icon-shoucang'},
            ]
        }
    },
    mounted() {},
    methods: {
        pageSwitch(index,url) {
            this.currentIndex = index
            this.$router.push(url)
        }
    }
}
</script>

<style scoped lang="scss">
.container-side {
    width: 200px;
    height: calc(100vh - 100px);
    background-color: #f6f6f8;
    border-right: 1px solid #e1e1e2;
    .menu-box {
        width: 100%;
        height: 100%;
        .recommend {
            padding: 10px;
            color: #8f8f90;
            font-size: 16px;
        }
        .menu-list {
            width: 100%;
            height: 100%;
            .menu-item {
                width: 100%;
                padding: 10px 5px;
                display: flex;
                align-items: center;
                cursor: pointer;
                color: #5c5c5c;
                &.item-active {
                    position: relative;
                    color: #000000;
                    background-color: #e6e7ea;
                    & > .iconfont{
                        font-weight: bold;
                    }
                    &:before {
                        content: '';
                        width: 3px;
                        bottom: 0;
                        top: 0;
                        left: 0;
                        position: absolute;
                        border-left: 3px solid #c62f2f;
                    }
                }
                &:hover {
                    color: #000000;
                }
                & > span {
                    margin-right: 8px;
                    font-size: 14px;
                }
                & > .iconfont {
                    font-size: 15px;
                    padding-top: 2px;
                    color: #5c5c5c;
                    padding-left: 5px;
                }
            }
        }
    }
}
</style>
