<template>
  <view>
    <canvas canvas-id="canvas" style="border: 1px solid red;" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></canvas>
    <select name="mode" v-model="mode">
      <option value="point">标记关键点</option>
      <option value="rect">绘制矩形框</option>
    </select>
    <button @click="undo">撤销</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mode: 'point',
      pointArray: [],
      history: [],
      dragging: false,
      mousedown: null
    };
  },
  mounted() {
    this.addHistory();
  },
  methods: {
    windowToCanvas(x, y, type) {
      const query = uni.createSelectorQuery();
      query.select('#canvas').boundingClientRect(data => {
        const canvasWidth = data.width;
        const canvasHeight = data.height;
        const canvasLeft = data.left;
        const canvasTop = data.top;
        const point = {
          x: x - canvasLeft * (canvasWidth / data.width),
          y: y - canvasTop * (canvasHeight / data.height),
          type: type
        };
        this.drawPoint(point);
      }).exec();
    },
    drawPoint(point) {
      const ctx = uni.createCanvasContext('canvas');
      ctx.save();
      ctx.fillStyle = point.type === 3 ? 'red' : 'green';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.setFontSize(20);
      ctx.fillText(this.pointArray.length.toString(), point.x - 5, point.y - 10);
      ctx.restore();

      this.pointArray.push(point);
    },
    updateRect(point) {
      const ctx = uni.createCanvasContext('canvas');
      const w = Math.abs(point.x - this.mousedown.x);
      const h = Math.abs(point.y - this.mousedown.y);
      const left = point.x > this.mousedown.x ? this.mousedown.x : point.x;
      const top = point.y > this.mousedown.y ? this.mousedown.y : point.y;

      ctx.save();
      ctx.beginPath();
      ctx.rect(left, top, w, h);
      ctx.stroke();
      ctx.restore();
    },
    showLastHistory() {
      const ctx = uni.createCanvasContext('canvas');
      ctx.draw();
    },
    undo() {
      if (this.history.length > 1) {
        this.history[this.history.length - 1]['mode'] === 'point' && this.pointArray.pop();
        this.history.pop();
        this.showLastHistory();
      }
    },
    addHistory() {
      const ctx = uni.createCanvasContext('canvas');
      ctx.draw();
      this.history.push({
        mode: this.mode,
        data: ctx
      });
    },
    onTouchStart(e) {
      this.mousedown = this.windowToCanvas(e.touches[0].clientX, e.touches[0].clientY, e.touches[0].type);
      this.dragging = true;
    },
    onTouchMove(e) {
      if (this.dragging && this.mode === 'rect') {
        this.showLastHistory();
        this.updateRect(this.windowToCanvas(e.touches[0].clientX, e.touches[0].clientY, e.touches[0].type));
      }
    },
    onTouchEnd(e) {
      this.dragging = false;
      if (this.mode === 'point') {
        this.drawPoint(this.mousedown);
      }
      this.addHistory();
    }
  }
};
</script>