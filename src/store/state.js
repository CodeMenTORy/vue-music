import { playMode } from 'common/js/config';
import { loadSearch } from 'common/js/cache';

export default {
  singer: {}, // 歌手
  playing: false, // 播放 or 暂停
  fullScreen: false, // 是否全屏播放
  playlist: [], // 播放列表
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 目前歌曲
  disc: {}, // 歌单
  topList: {}, // 排行榜
  searchHistory: loadSearch(), // 搜索历史,从本地读取初始值
};
