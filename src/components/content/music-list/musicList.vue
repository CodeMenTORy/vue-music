<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length > 0" ref="btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      class="list"
      ref="list"
      :probe-type="probetype"
      @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/scroll';
import SongList from 'components/content/song-list/songList';
import Loading from 'components/common/loading/loading';

import { prefixStyle } from 'common/js/dom';
import { mapActions } from 'vuex';

const RESERVED_HEIGHT = 40;
const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');

export default {
  name: 'musicList',
  props: {
    bgImage: {
      type: String,
      default: '',
    },
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      scrollY: 0,
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
  },
  components: {
    Scroll,
    SongList,
    Loading,
  },
  created() {
    this.probetype = 3;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y;
    },
    back() {
      this.$router.back();
    },
    ...mapActions(['selectPlay', 'randomPlay']),
    selectItem(song, index) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    random() {
      this.randomPlay({
        list: this.songs
      })
    },
  },
  watch: {
    scrollY(newY) {
      // 取最大的那个 保证最大只会在minTranslateY
      let translateY = Math.max(this.minTranslateY, newY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;

      // 设置图片随列表拖动覆盖

      // 设置layer层的滚动，随着歌单一起滚
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;

      if (newY < this.minTranslateY) {
        // 当拉到最顶端时，图片覆盖文字，并且高度减少
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        // 播放按钮消失
        this.$refs.btn.style.display = 'none';
      } else {
        // 没有拉到顶端时，恢复原样
        this.$refs.bgImage.style.paddingTop = '70%';
        this.$refs.bgImage.style.height = 0;
        this.$refs.btn.style.display = '';
      }

      // 设置图片随列表拖动缩放
      const percent = Math.abs(newY / this.imageHeight);
      // 列表下拉时,图片放大newY相应比例
      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 10;
      } else {
        // 列表上拉时模糊，最大只有20
        blur = Math.min(20 * percent, 20);
      }
      // 修改模糊
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`;

      // 修改层级关系
      this.$refs.bgImage.style.zIndex = zIndex;

      // 缩放比例
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
