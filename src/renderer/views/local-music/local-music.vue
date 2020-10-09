<template>
    <div class="local-music">
        <div class="top-path-info">
            本地音乐 <span class="total">共0首</span>
        </div>
        <div class="play-btn" v-if="musicList.length > 0">
            <button type="button" class="layui-btn layui-btn-sm">
                <i class="iconfont icon-bofang_huaban"></i>
                <span class="play-all">播放全部</span>
                <i class="iconfont icon-tianjiajiahaowubiankuang"></i>
            </button>
        </div>
        <div class="music-list" v-if="musicList.length > 0">
            <div class="layui-form">
                <table class="layui-table" id="LAY_table_user" lay-filter="LAY_table_user">
                </table>
            </div>
        </div>
        <div class="play-btn" v-else>暂无更多歌曲哦</div>
    </div>
</template>



<script>

import { mapActions } from 'vuex'
const { exec } = require('child_process')
import { existDirCreate, findDirAndFile,readFileInfo } from '@/utils/files'
import { resolve } from 'url'
let table = null
layui.use('table', function () {
    table = layui.table
})
export default {
    data() {
        return {
            diskSize: '',
            workCataLog: '',
            musicList: []
        }
    },
    mounted() {
        this.findDisks()
    },
    methods: {
         ...mapActions(['disMusicList', 'disCurrentMusic']),
        /**
         * 获取系统盘符
         */
        findDisks() {
            // xp 无法获取
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
                this.findFiles(path)
            })
        },
        // 查找文件
        findFiles(path) {
            this.layIndex = layer.load(0); 
            findDirAndFile(path).then((result) => {
                const { dirLists, fileLists } = result
                this.workCataLog = dirLists.find(
                    (item) => item.indexOf('music') != -1
                );
                if(!this.workCataLog){
                     layer.close(this.layIndex)
                    return;
                }
                findDirAndFile(this.workCataLog).then((rs)=>{
                   this.generatorList(rs.dirLists).then(()=>{
                       this.createTable()
                   })
                })
            })
        },
        generatorList(dirLists){
            const that = this;
            return new Promise((resolve) =>{
                dirLists.forEach(element => {
                    readFileInfo(element).then(re=>{
                        that.musicList.push(re)
                    })
                });
                setTimeout(()=>{
                    resolve()
                },1000)
            })
        },
        createTable() {
            const list = this.musicList;
            table.render({
                elem: '#LAY_table_user',
                data: list,
                cols: [
                    [
                        { field: 'pic',title:'图片',templet: '#imageTpl'},
                        { field: 'title',title: '音乐标题'},
                        { field: 'artist', title: '歌手'},
                        { field: 'size', title: '时长' },
                        { field: 'size', title: '大小'},
                        { field: 'src', title: '路径'},
                        { field: 'time', title: '时间' },
                    ]
                ],
                page: {
                     layout: [
                        'count',
                        'prev',
                        'page',
                        'next',
                    ],
                    theme: '#a82828',     
                },
                skin: 'line',
            })
            layer.close(this.layIndex)
            //监听行单击事件（双击事件为：rowDouble） 单行(row)
            table.on('rowDouble(LAY_table_user)',(obj) => {
                this.disCurrentMusic(obj.data)
                obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
            });
        }
    }
}
</script>

<style scoped lang="scss">
.local-music {
    width: 100%;
    .top-path-info {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e1e1e2;
        box-sizing: border-box;
        display: flex;
        padding: 0 30px 5px;
        align-items: flex-end;
        font-size: 25px;
        & .total {
            font-size: 18px;
            padding-left: 15px;
            color: #7c7d85;
        }
    }
    .play-btn {
        height: 50px;
        border-bottom: 1px solid #e1e1e2;
        box-sizing: border-box;
        padding: 5px 30px;
        display: flex;
        align-items: center;
        .layui-btn {
            display: flex;
            align-items: center;
            background-color: #b12323;
            border: none;
            .icon-bofang_huaban {
                font-size: 20px !important;
            }
            .play-all {
                padding: 0 5px;
            }
        }
    }
    .music-list {
        width: 100%;
        box-sizing: border-box;
        /deep/ .layui-table-page{
            text-align: right;
        }
        /deep/ .layui-table-cell{
            min-height: 50px;
        }
    }
}
</style>
