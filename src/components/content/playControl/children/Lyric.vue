<template>
  <div id="lyric">
    <scroll
      class="scroll"
      ref="myScroll"
    >
      <div
        v-if="!lyric.olyric"
        class="entirely-center"
        style="display: flex; align-items: center; justify-content: center; flex-direction: column;"
      >
        <p style="padding-bottom: 5px;">纯音乐，请欣赏</p>
        <p><span style="text-decoration: underline;">开启动效</span> 沉浸享受</p>
      </div>

      <ul>
        <li
          v-for="(item, index) in timeSign"
          :key="index"
          :style="{color: lyricIndex === index ? 'skyblue' : '#ded9d9'}"
        >{{item.olyric.olyric}}<br />{{item.tlyric.tlyric}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Lyric",
  data() {
    return {
      timeSign: [],
      lyricIndex: 0,
    };
  },
  components: {
    Scroll,
  },
  props: {
    lyric: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.$on("refresh", () => {
      this.$nextTick(() => {
        this.$refs.myScroll.refresh();
      });
    });
  },
  watch: {
    lyric: {
      handler() {
        this.$nextTick(() => {
          // 区别原文与翻译格式化辅助数据，千万不能用同一个
          const onewline = /\n/g,
            tnewline = /\n/g;
          const oreg = /\[\d+:\d\d\.\d+]/g,
            treg = /\[\d+:\d\d\.\d+]/g;
          let ostr = "",
            tstr = "";
          let onowIndex = -1,
            tnowIndex = -1;

          // 由于与原文相对于的翻译匹配出来的时间不一样，所以先临时存放所有翻译
          const temporary = [];
          // 先将原文存放好，如果有翻译，则进行处理后也放入。
          const timeSign_copy = [];

          // 格式化歌词函数
          function forMat(lyric, index, str, newline) {
            if (lyric) {
              const startIndex =
                (index = lyric.indexOf(str[0], index + 1)) + str[0].length;
              let endIndex = -1;
              // 由于翻译对应原文出现的时间较早或者相等，需要找到比原文换行位置靠后或者相同的翻译换行位置
              while ((endIndex = newline.exec(lyric))) {
                if (endIndex.index >= startIndex) break;
              }
              return endIndex !== null
                ? lyric.slice(startIndex, endIndex.index)
                : "";
            }
          }
          while ((ostr = oreg.exec(this.lyric.olyric))) {
            // 获取格式化之后的原文与翻译歌词
            const olyric = forMat(this.lyric.olyric, onowIndex, ostr, onewline);
            // 由于有些歌是没有翻译的，所以这里先判断是不是有翻译
            if ((tstr = treg.exec(this.lyric.tlyric))) {
              const tlyric = forMat(
                this.lyric.tlyric,
                tnowIndex,
                tstr,
                tnewline
              );
              // 由于原文与翻译的歌词数量是不一样的，先保存翻译，在所有循环结束之后，再把原文与对应翻译合到一起
              if (tlyric !== "")
                temporary.push({
                  tlyric,
                  tstr: tstr[0],
                });
            }

            // 获取格式化之后歌词出现时间
            const minutes = ostr[0].slice(1, ostr[0].indexOf(":"));
            const seconds = ostr[0].slice(
              ostr[0].indexOf(":") + 1,
              ostr[0].length - 1
            );

            // 保存原文以及歌词出现时间，且不保存空行
            if (olyric !== "")
              timeSign_copy.push({
                beginTime: Number((minutes * 60 + Number(seconds)).toFixed(3)),
                olyric: {
                  olyric,
                  ostr: ostr[0],
                },
                tlyric: {},
              });
          }
          // 如果有翻译的话
          if (temporary.length) {
            // 保存原文与翻译的第一个对应时间的歌词在原文中的序号
            let index = -1;
            for (let i = 0; i < timeSign_copy.length; i++) {
              if (temporary[0].tstr == timeSign_copy[i].olyric.ostr) {
                index = i;
                break;
              }
            }
            // 从第一个对应时间的序号处按顺序下来与原文一一对应即可。这样做比每次都循环找到对应时间节省很多性能
            for (let i = index, j = 0; i < timeSign_copy.length; i++, j++) {
              timeSign_copy[i].tlyric = temporary[j];
            }
          }
          // 所有处理好了之后，赋值给timeSign。这个数组才是最后用到的
          this.timeSign = timeSign_copy;
          this.$refs.myScroll.scrollTo(0, 0, 0);
        });
      },
      deep: true,
    },
    "$store.state.audio.currentTime"(val) {
      if (val === 0) this.$store.state.breakpoint = 0;
      if (val <= this.timeSign[0].beginTime) {
        // :class="{route: !isLyric, pause: isLyric}"
        this.lyricIndex = 0;
      } else if (this.$store.state.breakpoint === this.timeSign.length - 2) {
        this.lyricIndex = this.timeSign.length - 1;
      } else {
        for (
          let i = this.$store.state.breakpoint;
          i < this.timeSign.length - 1;
          i++
        ) {
          console.log("change");
          if (
            val >= this.timeSign[i].beginTime &&
            val <= this.timeSign[i + 1].beginTime
          ) {
            this.lyricIndex = i;
            this.$store.state.breakpoint = i;
            this.$refs.myScroll.scrollTo(0, -i * 38, 2000);
            break;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#lyric {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  text-align: center;

  overflow: hidden;
}
.scroll {
  height: 100%;
}
ul {
  padding: 50% 0;
}
li {
  padding: 10px 0;
}
</style>