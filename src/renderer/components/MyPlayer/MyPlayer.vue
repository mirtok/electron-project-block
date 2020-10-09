<template>
    <div class="container-player">
        <aplayer autoplay :music="musicCurrentItem" theme="#ff0000" :list="musicInitList" listFolded showLrc>
        </aplayer>
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
import hls from 'hls.js'
Aplayer.disableVersionBadge = true
import { mapGetters } from 'vuex'
export default {
    components: {
        Aplayer
    },
    data() {
        return {}
    },
    computed:{
        ...mapGetters(['musicCurrentItem','musicInitList'])
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
.container-player {
    width: 100%;
    height: 70px;
    background-color: #f6f6f8;
    border-top: 1px solid #e1e1e2;
    display: flex;
    align-items: flex-end;
    .aplayer{
        flex: 1;
        margin: 0;
    }
}
</style>
