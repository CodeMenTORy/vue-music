<template>
  <div class="list-content">
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShourcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="index"
          class="item"
          :data-index="index"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <scroll
      class="listview"
      :data="data"
      ref="listview"
      :probeType="3"
      @scroll="scroll"
    >
      <ul>
        <li
          v-for="(group, index) in data"
          :key="index"
          class="list-group"
          ref="listgroup"
        >
          <h2 class="list-group-title">{{ group.name }}</h2>
          <ul>
            <li
              v-for="(item, index) in group.singer"
              :key="index"
              class="list-group-item"
              @click="selectItem(item)"
            >
              <img class="avatar" v-lazy="item.singer_pic" alt="avatar" />
              <span class="name">{{ item.singer_name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/scroll";

import { getData } from "common/js/dom";

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;

export default {
  name: "listview",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
    };
  },
  computed: {
    shortcutList() {
      return this.data.map((item) => {
        return item.name.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].name
        : "";
    },
  },
  components: {
    Scroll,
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY > 0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          // diff 为下限到顶部的值
          this.diff = height2 + newY;
          return;
        }
      }
      // 滚动到底部，且-newY大于最后一个元素的height2
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    },
  },
  // 不需要动态更新的数据，不放在data里
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.touch = {};
    this.listHeight = [];
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;

      this._scrollTo(anchorIndex);
    },
    onShourcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;

      this._scrollTo(anchorIndex);
    },
    scroll(position) {
      this.scrollY = position.y;
    },
    selectItem(item){
      this.$emit('select', item)
    },
    // 计算每一个列表的高度
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listgroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.list-content {
  position: relative;
  height: 100%;
  overflow: hidden;

  .list-shortcut {
    position: fixed;
    z-index: 30;
    right: 0;
    top: calc(50% + 44px);
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;

    .list-group {
      padding-bottom: 30px;

      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }

      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
  }

  .list-fixed {
    position: fixed;
    top: 88px;
    left: 0;
    width: 100%;
    z-index: 10;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
