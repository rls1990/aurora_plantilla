const canvas = document.getElementById("header_camba");

const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");

function clear() {
	/* se le cambia el color de fondo */
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, width, height);
}

function getNoise() {
	var Noise = {
		noise: [[], [], [], [], [], [], [], [], [], []],
		initialize: function() {
			for (var i = 0; i < this.noise.length; ++i) {
				this.noise[i].length = 10;
				for (var j = 0; j < this.noise[i].length; ++j) {
					this.noise[i][j] = Math.random();
				}
			}
		},
		lerp: function(a, b, t) {
			if (t < 0) t = 0;
			else if (t > 1) t = 1;
			return (1.0 - t) * a + b * t;
		},
		sample: function(x, y) {
			var dx = 9.0 * x / 1.0;
			var dy = 9.0 * y / 1.0;
			const x_index = Math.floor(Math.abs(dx - 0.0001));
			const y_index = Math.floor(Math.abs(dy - 0.0001));
			dx = Math.abs(dx - x_index);
			dy = Math.abs(dy - y_index);
			const top = this.lerp(this.noise[y_index][x_index], this.noise[y_index][x_index + 1], dx);
			const bot = this.lerp(this.noise[y_index + 1][x_index], this.noise[y_index + 1][x_index + 1], dx);
			return this.lerp(top, bot, dy);
		},
		wrapd: function(){
			var temp = this.noise.pop();
			this.noise.splice(0, 0, temp);
		}
	};
	Noise.initialize();
	return Noise;
}

const Noise = getNoise();
const r_ch = getNoise();
const g_ch = getNoise();
const b_ch = getNoise();

var t = 0;
var snow = [];
function init () {
	for (var i = 0; i < width; i += 2.5) {
		const alpha = Noise.sample(i/width, t);
		if (alpha > 0){
			const red = r_ch.sample(i/width, t)*255;
			const green = g_ch.sample(i/width, t)*255;
			const blue = b_ch.sample(i/width, t)*255;
			snow.push(
				{
					x: i,
					y: 0,
					color: "rgba("+ red.toString() + "," + green.toString() + "," + blue.toString() + ",",
					a: alpha
				});
		}
	}
	t += 0.002;
	if (t > 1) {
		t -= 1;
		Noise.wrapd();
		r_ch.wrapd();
		g_ch.wrapd();
		b_ch.wrapd();
	}
}
init();

const circle = 2 * Math.PI;
function draw_frame() {
	clear();
	for (var i = 0; i < snow.length; ++i) {
		ctx.beginPath();
		ctx.arc(snow[i].x, snow[i].y, 1.5, 0, circle);
		ctx.fillStyle = snow[i].color + snow[i].a.toString() + ")";
		ctx.fill();
		snow[i].y += 1;
		snow[i].a -= 0.01;
		if (snow[i].y > height || snow[i].a < 0) {
			snow.splice(i, 1);
			i--;
		}
	}
	init();
	window.requestAnimationFrame(draw_frame);
}

window.requestAnimationFrame(draw_frame);