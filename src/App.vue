<template>
  <div id="app">
    <m-header></m-header>
    <tab-control></tab-control>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/content/m-header/m-header';
import TabControl from 'components/content/tab-control/TabControl';

export default {
  name: 'App',
  components: {
    MHeader,
    TabControl,
  },
};
</script>

<style scoped></style>
