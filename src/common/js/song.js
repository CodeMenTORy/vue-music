import { getLyric } from 'api/song';

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res) {
          this.lyric = res;
          resolve(res);
        } else {
          reject('no lyric');
        }
      });
    });
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid || musicData.id,
    mid: musicData.songmid || musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname || musicData.title,
    album: musicData.albumname || musicData.album.name,
    duration: musicData.interval,
    image: `https://api.itooi.cn/tencent/pic?id=${musicData.songmid ||
      musicData.mid}`,
    url: `https://api.itooi.cn/tencent/url?id=${musicData.songmid ||
      musicData.mid}&quality=flac`,
  });
}

function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((item) => {
    ret.push(item.name);
  });
  return ret.join('/');
}
