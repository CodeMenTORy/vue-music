<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/content/music-list/musicList';

import { mapGetters } from 'vuex';
import { getSongList } from 'api/recommend';
import { createSong } from 'common/js/song';

export default {
  name: 'disc',
  data() {
    return {
      songs: [],
    };
  },
  components: {
    MusicList,
  },
  computed: {
    ...mapGetters(['disc']),
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
  },
  created() {
    this._getSongList();
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend');
      }
      getSongList(this.disc.dissid).then((res) => {
        console.log(res.data[0].songlist);
        this.songs = this._normalizeSongs(res.data[0].songlist);
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.id && musicData.mid) {
          console.log(createSong(musicData));
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
