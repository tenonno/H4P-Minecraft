const minecraft = new Minecraft();

// メッセージ
minecraft.on('PlayerMessage', (data) => {

    const message = data.body.properties.Message;

    console.info('PlayerMessage', message);

    if (message === 'locate') {

        // テレポート（相対）
        minecraft.locateBy(0, 10, 0);

    }

});

// 移動
minecraft.on('PlayerTravelled', (data) => {

    const x = data.body.measurements.PosAvgX;
    const y = data.body.measurements.PosAvgY;
    const z = data.body.measurements.PosAvgZ;

    console.info('PlayerTravelled', x, y, z);
});


// kill
// minecraft.kill('user name');

// メッセージ送信
minecraft.say('test', 'user name');

for (let i = 10; i--;) {

    // ブロック配置
    minecraft.setBlock('grass', 0, i, 0);

}
