<template>
  <div class="search">
    <div class="search-box">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="(item, index) in hotKey"
              :key="index"
              @click="addQuery(item.k)"
            >
              <span>{{ item.k }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @listScroll="blurInput"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHotKey } from "api/search";

import SearchBox from "components/content/search-box/searchBox";
import Suggest from "components/content/suggest/suggest";

export default {
  name: "search",
  components: {
    SearchBox,
    Suggest,
  },
  data() {
    return {
      hotKey: [],
      query: "",
    };
  },
  created() {
    this._getHotKey();
  },
  methods: {
    // 获取热频词
    _getHotKey() {
      getHotKey().then((res) => {
        console.log(res.data.hotkey.slice(0, 10));
        this.hotKey = res.data.hotkey.slice(0, 10);
      });
    },
    // 监听输入框的输入
    onQueryChange(query) {
      console.log(query);
      this.query = query;
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    // 列表滚动时，input失去焦点
    blurInput() {
      this.$refs.searchBox.blur();
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>