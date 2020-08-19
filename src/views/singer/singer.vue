<template>
  <div class="singer">
    <list-view :data="singerList"></list-view>
  </div>
</template>

<script>
import Vue from 'vue';
import { getSingerList, getIndexCategory } from 'api/singer';

import ListView from 'components/common/listView/listview';

export default {
  name: 'singer',
  data() {
    return {
      singerList: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    // 获取歌手分类数据
    _getSingerList() {
      getIndexCategory()
        .then((res) => {
          this.singerList = res.data.index.slice(0, 27);
          console.log(this.singerList);
        })
        .then(() => {
          this.singerList.forEach((item, index) => {
            getSingerList(this.singerList[index].id).then((res) => {
              // 使用set方法定义为响应式
              Vue.set(this.singerList[index], 'singer', res.data);
            });
          });
        });
    },
  },
  components: {
    ListView,
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
