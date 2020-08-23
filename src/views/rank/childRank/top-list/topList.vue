<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
      :rank="rank"
    ></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getMusicList } from "api/rank";
import { createSong } from "common/js/song";

import MusicList from "components/content/music-list/musicList";

export default {
  name: "topList",
  data() {
    return {
      songs: [],
      rank: true,
    };
  },
  components: {
    MusicList,
  },
  computed: {
    ...mapGetters(["topList"]),
    title() {
      return this.topList.topTitle;
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return "";
    },
  },
  created() {
    this._getMusicList();
  },
  activated() {
    this._getMusicList();
  },
  methods: {
    _getMusicList() {
      getMusicList(this.topList.id).then((res) => {
        this.songs = this._normalizaSongs(res.songlist);
      });
    },
    _normalizaSongs(list) {
      let ret = [];
      list.forEach((item) => {
        const musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
