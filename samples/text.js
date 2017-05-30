import Minecraft from 'minecraft';

const minecraft = new Minecraft();

const canvas = document.createElement('canvas');

const w = 100;
const h = 20;

canvas.width = w;
canvas.height = h;

const context = canvas.getContext('2d');


context.fillStyle = '#000';
context.font = "15px メイリオ";
context.textAlign = 'center';
context.textBaseline = 'middle';


context.fillText('HackforPlay', w / 2, h / 2);

const imageData = context.getImageData(0, 0, w, h);

for (let x = 0; x < w; ++x) {
    for (let y = 0; y < h; ++y) {

        const alpha = imageData.data[x * 4 + y * w * 4 + 3];

        const block = alpha >= 50 ? 'stone' : 'air';

        minecraft.setBlock(block, x, 100, y);


    }
}


document.body.appendChild(canvas);
