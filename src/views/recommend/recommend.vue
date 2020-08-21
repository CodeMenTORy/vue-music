<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll">
      <div class="slider-wrapper" v-if="recommends.length">
        <slider>
          <div v-for="(item, index) in recommends" :key="index">
            <a href="https://www.baidu.com">
              <img :src="item.pic_info.url" alt="pics" @load="imgLoad" />
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="(item, index) in discList" class="item" :key="index">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl" />
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from 'api/recommend';
import { playlistMixin } from 'common/js/mixin';

import Slider from 'components/common/slider/slider';
import Scroll from 'components/common/scroll/scroll';
import Loading from 'components/common/loading/loading';

export default {
  name: 'recommend',
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: [],
    };
  },
  computed: {},
  components: {
    Slider,
    Scroll,
    Loading,
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    // 获取推荐图
    _getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data;
      });
    },
    // songUrl(index) {
    //   return `https://y.qq.com/n/yqq/album/${this.recommends[index].data.jump_info.url}.html`;
    // },
    // 获取热门歌单列表
    _getDiscList() {
      getDiscList().then((res) => {
        this.discList = res.data.list;
      });
    },
    // 图片加载完成后刷新scroll
    imgLoad() {
      // 只加载一次
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
