import { playMode } from 'common/js/config';

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
};
