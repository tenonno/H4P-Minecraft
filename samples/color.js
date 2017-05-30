import Minecraft from 'minecraft';

feeles.fetchDataURL('topback.png').then((url) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = url;
    });
}).then((image) => {


    const minecraft = new Minecraft();

    minecraft.locateBy(0, 10, 0);

    return;

    const canvas = document.createElement('canvas');

    const w = 200;
    const h = 85;

    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext('2d');


    context.drawImage(image, 0, 0, w, h);

    const imageData = context.getImageData(0, 0, w, h);


    function rgb(colorName) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const context = canvas.getContext('2d');
        context.fillStyle = colorName;
        context.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
        return {
            r,
            g,
            b,
            a
        };
    }




    const colors = [
        'white',
        'orange',
        'magenta',
        'lightblue',
        'yellow',
        'lime',
        'pink',
        'lime',
        'lightgray',
        'cyan',
        'purple',
        'blue',
        'brown',
        'green',
        'red',
        'black'
    ].map((color) => {
        return rgb(color);
    });




    function euclidean(r1, g1, b1, r2, g2, b2) {
        return Math.sqrt(
            Math.pow(r2 - r1, 2) +
            Math.pow(g2 - g1, 2) +
            Math.pow(b2 - b1, 2)
        );
    }


    for (let x = 0; x < w; ++x) {
        for (let y = 0; y < h; ++y) {


            let r = imageData.data[x * 4 + y * w * 4 + 0];
            let g = imageData.data[x * 4 + y * w * 4 + 1];
            let b = imageData.data[x * 4 + y * w * 4 + 2];


            r *= 1.2;
            g *= 1.2;
            b *= 1.2;

            const data = colors.map((c, index) => {
                return {
                    index,
                    value: euclidean(c.r, c.g, c.b, r, g, b)
                };
            }).sort((a, b) => {
                return a.value - b.value;
            })[0].index;

            // console.log(data);

            const block = `concrete:${data}`;


            minecraft.setBlock(block, x, 70, y, false);


        }
    }


    document.body.appendChild(canvas);


});
