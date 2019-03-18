import _APP_CONFIG_ from '@/electron/APP_CONFIG.js';

let TQ = {
  running: false,
  queue: [],
  push(option) {
    if (typeof option === "function") {
      option = {
        fn: option
      }
    }
    this.queue.push(option)
    this.run();
  },
  run() {
    if (this.running) return;
    this.running = true;
    this.next();
  },
  async next() {
    const queue = this.queue;
    if (!queue || queue.length < 1) {
      this.running = false;
      return;
    }
    const item = queue[0];
    typeof item.start === "function" && item.start();
    item._timeout = setTimeout(() => {
      item._isTimeOut = true;
      queue.shift();
      this.next();
      console.log("TQTimeOut");
    }, _APP_CONFIG_.TASK_QUEUE_TIME_OUT || 180000);
    try {
      await item.fn();
      clearTimeout(item._timeout);
    } catch (e) {
      clearTimeout(item._timeout);
    }
    if (!item._isTimeOut) {
      queue.shift();
      this.next();
    }

  }
}

export default {
  task: option => TQ.push(option),
  size: () => TQ.queue.length
};