<template>
    <div class="header">
        <div class="hed">
            <!-- logo -->
            <h1 class="left-logo"></h1><span class="logo-name">佰音乐</span>
            <!-- 搜索 -->
            <div class="center-search">
                <div class="word-box">
                    <input
                        v-model="keyWords"
                        placeholder="搜索音乐/玻璃之情"
                        class="keyword"
                        @keyup.enter="search"
                    />
                    <span class="iconfont icon-search" @click="search"></span>
                </div>
            </div>
            <!-- 菜单 -->
            <div class="right-meun e-text-right">
                <img
                    v-if="avator"
                    :src="avator"
                    alt="头像"
                    class="user-avatar"
                />
                <span v-else class="iconfont icon-touxiang"></span>
                <span class="user-name">{{
                    username ? username : '未登录'
                }}</span>
                <span
                    class="iconfont icon-minimum"
                    @click="screenAction('minWindow')"
                ></span>
                <span
                    class="iconfont icon-xiaoxi"
                    @click="screenAction('maxWindow')"
                ></span>
                <span
                    class="iconfont icon-guanbi"
                    @click="screenAction('closeWindow')"
                ></span>
            </div>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapGetters,mapActions } from 'vuex'
export default {
    name: 'myheader',
    data() {
        return {
            username: '超级用户',
            avator: '',
            keyWords: ''
        }
    },
    watch:{
        keyWords(newVal){
            this.disMusicInput(newVal)
        }
    },
    methods: {
        ...mapActions(['disMusicInput','disMusicList']),
        screenAction(action) {
            ipcRenderer.send(action)
        },
        search(){
            this.disMusicList()
        }
    }
}
</script>

<style scoped lang="scss">
$width: 100%;
$height: 100%;
@mixin flexStyle($mode: row, $row: center, $col: center) {
    display: flex;
    justify-content: $row;
    align-items: $col;
    flex-direction: $mode;
}

.header {
    height: 50px;
    padding: 0 10px 0 20px;
    background-color: #c62f2f;
    color: #ffffff;
    -webkit-app-region: drag;
    .hed {
        height: $height;
        @include flexStyle($row: space-between, $col: center);
        .left-logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: url('~@/assets/img/logo.jpg') center / cover no-repeat;
        }
        .logo-name{
            margin-left: 10px;
            font-size: 20px;
        }
        .center-search {
            width: 200px;
            height: 50px;
            margin-left: 60px;
            display: flex;
            align-items: center;
            .word-box {
                padding: 0 10px;
                width: 100%;
                height: 30px;
                border-radius: 20px;
                background-color: #a82828;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .icon-search {
                    color: #c67171;
                   cursor: pointer;
                   -webkit-app-region: no-drag;
                }
            }
            .keyword {
                width: 80%;
                background-color: transparent;
                border: none;
                -webkit-app-region: no-drag;
                outline: none;
                color: #ffffff;
                &::placeholder {
                    color: #c67171;
                }
            }
        }
        .right-meun {
            flex: 1;
            @include flexStyle($row: flex-end, $col: center);
            & > span {
                -webkit-app-region: no-drag;
                font-size: 16px;
            }
            .iconfont {
                padding: 0 5px;
                cursor: pointer;
            }
            .icon-touxiang {
                font-size: 30px;
            }
            .user-avatar {
                width: 35px;
                height: 30px;
                cursor: pointer;
                border-radius: 50%;
            }
            .user-name {
                padding: 0 5px;
                cursor: pointer;
            }
        }
    }
}
</style>
