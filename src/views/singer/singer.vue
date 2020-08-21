<template>
  <div class="singer" ref="singer">
    <list-view :data="singerList" @select="selectSinger" ref="list"></list-view>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import { getSingerList, getIndexCategory } from 'api/singer';
import { playlistMixin } from 'common/js/mixin';

import ListView from 'components/common/listView/listview';

export default {
  name: 'singer',
  mixins: [playlistMixin],
  data() {
    return {
      singerList: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    // 点击事件跳转详情页，并且改变vuex中singer状态
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.singer_mid}`,
      });
      this.setSinger(singer);
    },
    // 获取歌手分类数据
    _getSingerList() {
      getIndexCategory()
        .then((res) => {
          this.singerList = res.data.index.slice(0, 27);
        })
        .then(() => {
          this.singerList.forEach((item, index) => {
            getSingerList(this.singerList[index].id).then((res) => {
              // 使用set方法定义为响应式
              Vue.set(this.singerList[index], 'singer', res.data);
            });
          });
          console.log(this.singerList);
        });
    },
    ...mapMutations({
      setSinger: 'SET_SINGER',
    }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
  },
  components: {
    ListView,
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 88px);
  overflow: hidden;
}
</style>
