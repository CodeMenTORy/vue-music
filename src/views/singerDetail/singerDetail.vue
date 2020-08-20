<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singerDetail";
import { createSong } from "common/js/song";

import MusicList from "components/content/music-list/musicList";

export default {
  name: "singerDetail",
  data() {
    return {
      songs: [],
    };
  },
  components: {
    MusicList,
  },
  computed: {
    ...mapGetters(["singer"]),
    title() {
      return this.singer.singer_name;
    },
    bgImage() {
      return this.singer.singer_pic;
    },
  },
  created() {
    this._getSingerDetail();
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.singer_mid) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.singer_mid).then((res) => {
        console.log(res);
        this.songs = this._normalizeSongs(res.data);
        console.log(this.songs);
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        let { musicData } = item;
        if (musicData.songid && musicData.songmid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
