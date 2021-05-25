// 防抖函数
export function debounce(func, delay = 200) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...arguments);
    }, delay);
  };
}
export function throttle(func, delay) {
  let preTime = 0;
  return function () {
    let curTime = Date.now();
    // let context = this;
    // let args = arguments;
    if (curTime - preTime > delay) {
      // func.apply(context, args);
      func();
      preTime = curTime;
    }
  }
}