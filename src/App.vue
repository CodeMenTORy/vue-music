<template>
  <div id="app">
    <m-header></m-header>
    <tab-control></tab-control>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/content/m-header/m-header';
import TabControl from 'components/content/tab-control/TabControl';
import Player from 'views/player/player'

export default {
  name: 'App',
  components: {
    MHeader,
    TabControl,
    Player
  },
};
</script>

<style scoped></style>
