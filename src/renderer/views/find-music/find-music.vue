<template>
    <div class="layui-container">
        <fieldset class="layui-elem-field layui-field-title">
            <legend>
                <div class="layui-row resource-select">
                    <label for="" class="play-option">播放资源:</label>
                    <select name="type" class="resource-list" v-model="type">
                        <option
                            v-for="(value, key, index) in resourceTypeList"
                            :value="key"
                            :key="index"
                        >
                            {{ value }}
                        </option>
                    </select>
                </div>
            </legend>
        </fieldset>
        <!-- music list -->
        <div class="songs-list">
            <div
                class="songs-list-item"
                v-for="item in musicInitList"
                :key="item.songid"
            >
                <div class="wrap" @click="disCurrentMusic(item)">
                    <div class="big-img">
                        <img :src="item.pic" :alt="item.title" />
                    </div>
                    <div class="big-title">
                        <div class="introud">
                            {{ item.title }}
                        </div>
                        <div class="download" @click.stop="downloadMusic(item)">
                            <span class="iconfont icon-xiazai1"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- page -->
        <div class="music-page" id="musicPage"></div>
    </div>
</template>
<script>
import { getMusic } from '@/api/music'
import { mapGetters, mapActions } from 'vuex'
import { fileDownload,existDirCreate } from '@/utils/files'
const { exec } = require('child_process')
const musicHeader = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
}
const loading = function(){
    return layer.load(2, {
        shade: [0.2, '#fff'], //0.5透明度的灰色背景
        content: '加载中',
        success: function (layero) {
            layero.find('.layui-layer-content').css({
                'padding-top': '39px',
                'width': '60px'
            })
        }
    })
}
const { dialog } = require('electron').remote

export default {
    name: 'index',
    data() {
        return {
            type: 'netease',
            page: 1,
            diskSize: ''
        }
    },
    watch: {
        type(newval) {
            this.$store.dispatch('disMusicType', newval)
            this.disMusicList()
        }
    },
    computed: {
        ...mapGetters([
            'resourceTypeList',
            'musicInitInput',
            'musicInitList',
            'getMusicPage',
            'musicInitType'
        ])
    },
    methods: {
        ...mapActions(['disMusicList', 'disCurrentMusic', 'disMusicPage']),
        createLaypage() {
            layui.use(['laypage', 'layer'], () => {
                const laypage = layui.laypage
                const layer = layui.layer
                laypage.render({
                    elem: 'musicPage',
                    count: this.musicInitList.length * 8,
                    layout: ['count', 'prev', 'page', 'next'],
                    theme: '#a82828',
                    jump: (obj) => {
                        const { curr } = obj
                        if (curr != 1) {
                            this.disMusicPage(curr)
                        }
                    }
                })
            })
        },
        downloadMusic(item) {
            const {src,artist,lrc,pic,title} = item;
            const downloadList = [pic,src,{title,artist,lrc}];
            downloadList.forEach(item => {
                const index = loading()
                fileDownload(item,this.diskSize,(title + '-' + artist)).then(res=>{
                    layer.msg(res, {icon: 1})
                    layer.close(index)
                })
            }) 
        },
        findDisks() {
            exec('wmic logicaldisk get caption', (err, stdout, stderr) => {
                if (err || stderr) {
                    console.log('root path open failed' + err + stderr)
                    return
                }
                const allCaotion = stdout
                    .replace(/Caption/gi, '')
                    .replace(/[ ]|[\r\n]/g, '')
                    .split(':')
                    .filter((item) => item.length != '')
                this.diskSize = allCaotion.pop() + ':/MyCustomMusic'
                this.createDirctory(this.diskSize)
            })
        },
         // 创建文件夹
        createDirctory(path) {
            existDirCreate(path).then((res) => {
                console.log(res)
            })
        },
    },
    mounted() {
        this.disMusicList().then(() => {
            if (this.musicInitList.length > 9) {
                this.createLaypage()
            }
            this.findDisks()
        })
    //   console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
    }
}
</script>
<style lang="scss" scoped>
.layui-container {
    width: 100%;
    padding: 20px 30px;
    /deep/ .resource-select {
        display: flex;
        align-items: center;
        & > select {
            display: block;
            min-width: 150px;
            border-radius: 4px;
            cursor: pointer;
        }
        .play-option {
            margin-right: 10px;
        }
    }
    .songs-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        .songs-list-item {
            min-width: 205px;
            min-height: 200px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            .wrap {
                width: 180px;
                min-height: 200px;
                cursor: pointer;
                .big-img {
                    width: 100%;
                    height: 180px;
                }
                .big-title {
                    padding: 4px 0 10px 0;
                    line-height: 24px;
                    display: flex;
                    .download {
                        width: 20px;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .introud {
                        flex: 1;
                    }
                }
            }
        }
    }
    .music-page {
        width: 100%;
        text-align: right;
    }
}
</style>