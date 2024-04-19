<template>
	<view>
		<view
			style=" margin-bottom: 50rpx;position: relative;height: 800rpx;background-size: 100%/100%;background-repeat: no-repeat;"
			:style="{backgroundImage:bgImg}">
			<canvas :canvas-id="canvasId" style="height: 800rpx;width: 100%;"
				@touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" :ref="canvasRefP"></canvas>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['canId', 'canvasRefP', 'listInd', 'bgImg'],
		data() {
			return {
				flagList: [],
				mode: 'rect',
				pointArray: [],
				history: [],
				dragging: false,
				mousedown: null,
				ctx: "",
				w: "",
				h: "",
				left: "",
				top: "",
				canvasId: "",
				canvasRef: ""
			};
		},
		created() {
			this.canvasId = this.canId
			this.canvasRef = this.canvasRefP
			this.$nextTick(() => {
				for (let a in this.$refs) {
					this.ctx = uni.createCanvasContext(this.canvasId, this.$refs[a]);
					this.addHistory();
				}
			});
		},

		methods: {
			updateRect(point) {
				this.w = Math.abs(point.x - this.mousedown.x);
				this.h = Math.abs(point.y - this.mousedown.y);
				this.left = point.x > this.mousedown.x ? this.mousedown.x : point.x;
				this.top = point.y > this.mousedown.y ? this.mousedown.y : point.y;
				// this.ctx.save();
				// this.ctx.beginPath();
				// this.ctx.rect(this.left, this.top, this.w, this.h);
				// this.ctx.stroke();
				// this.ctx.restore();
				// this.ctx.draw(); // 绘制画布
				// console.log('12');
			},
			showLastHistory() {

				this.ctx.draw(true); // 绘制画布
			},
			undo() {
				if (this.history.length > 1) {
					this.history.pop();
					this.showLastHistory();
				}
			},
			addHistory() {
				this.ctx.draw(true, () => {
					uni.canvasToTempFilePath({
						canvasId: this.canvasId,
						success: (res) => {
							this.history.push({
								mode: 'rect',
								data: res.tempFilePath
							});
							this.showLastHistory(); // Draw the current state of the canvas
						},
						fail: (err) => {
							console.error(err);
						}
					}, this);
				});
			},
			onTouchStart(e) {
				e.preventDefault();
				const canvasX = e.touches[0].x;
				const canvasY = e.touches[0].y;
				this.mousedown = {
					x: canvasX,
					y: canvasY
				};
				this.dragging = true;
			},
			onTouchMove(e) {
				e.preventDefault();
				if (this.dragging && this.mode === 'rect') {
					this.showLastHistory();
					this.updateRect({
						x: e.touches[0].x,
						y: e.touches[0].y
					});
				}
			},
			onTouchEnd(e) {
				e.preventDefault();
				this.dragging = false;
				this.addHistory();
				this.ctx.save();
				this.ctx.beginPath();
				this.ctx.rect(this.left, this.top, this.w, this.h);
				this.ctx.strokeStyle = 'pink'; // Set the border color
				this.ctx.lineWidth = 2; // Set the border width
				this.ctx.stroke(); // Draw the border
				this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Set the fill color as a semi-transparent black
				this.ctx.fill(); // Fill the shape
				this.ctx.restore();
				this.ctx.draw(true); // Redraw the canvas
			}
		}
	};
</script>
