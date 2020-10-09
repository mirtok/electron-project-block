import { getMusic } from '@/api/music'

export default {
    state: {
        musicResource: {
            'netease': '网易',
            'qq': 'ＱＱ',
            'kugou': '酷狗',
            'kuwo': '酷我',
            'xiami': '虾米',
            'baidu': '百度',
            '1ting': '一听',
            'migu': '咪咕',
            'lizhi': '荔枝',
            'qingting': '蜻蜓',
            'ximalaya': '喜马拉雅',
            'kg': '全民K歌',
            '5singyc': '5sing原创',
            '5singfc': '5sing翻唱'
        },
        filter: 'name',
        type: 'netease',
        input: '玻璃之情',
        page: 1,
        currentMusic: {
            title: '玻璃之情',
            artist: '张国荣',
            src: 'http://m10.music.126.net/20200928182948/68fbd98745b0f3be856e6b3bc32eeda7/ymusic/5873/b48d/d14e/17a10cdcf43c5f428432591e2239a6ac.mp3',
            pic: 'http://p2.music.126.net/2YIpNoCzXfYgz4zIw3s0Vg==/73667279073787.jpg?param=300x300'
        },
        currentMusicList: []
    },
    getters: {
        resourceTypeList(state) {
            return state.musicResource
        },
        musicInitType(state) {
            return state.type
        },
        musicInitInput(state) {
            return state.input
        },
        musicInitList(state) {
            return state.currentMusicList
        },
        musicPage(state) {
            return state.page
        },
        musicCurrentItem(state){
            return state.currentMusic
        }
    },
    mutations: {
        setMusicType(state, value) {
            state.type = value
        },
        setMusicInput(state, value) {
            state.input = value
        },
        setMusicList(state, list) {
            state.currentMusicList = list
            if(Object.values(state.currentMusic).length == 0){
                state.currentMusic = list[0]
            }
        },
        setMusicPage(state, page) {
            state.page = page
        },
        setCurrentMusic(state,data){
            state.currentMusic = data
        }
    },
    actions: {
        disMusicType({commit},data){
            commit('setMusicType',data)
        },
        disMusicInput({commit,dispatch},data){
            commit('setMusicInput',data)
            commit('setMusicPage',1)
        },
        disMusicPage({commit,dispatch},data){
            commit('setMusicPage',data)
            dispatch('disMusicList')
        },
        disCurrentMusic({commit},data){
            commit('setCurrentMusic',data)
        },
        disMusicList({ commit, state }) {
            const data = {
                input: state.input,
                filter: state.filter,
                type: state.type,
                page: state.page,
            }
            return new Promise((resolve, reject) => {
                getMusic({ ...data }).then(result => {
                    if (result.code === 200) {
                        if(result.data.length > 0){
                            const list = result.data.map(item => {
                                let cItem = {}
                                cItem.src = item.url
                                cItem.artist = item.author
                                cItem.title = item.title
                                cItem.pic = item.pic
                                cItem.lrc = item.lrc
                                return cItem
                            })
                            commit('setMusicList', list)
                        }
                    }
                    resolve()
                })
            })
        }
    }
}
