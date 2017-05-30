/* イベント一覧
BlockPlaced
BlockBroken
EndOfDay
PlayerMessage
PlayerDied
PlayerBounced
PlayerTeleported
PlayerTravelled
MobKilled
MobKilled
EntitySpawned
AgentCommand
MultiplayerRoundStart
MultiplayerRoundEnd
CameraUsed
ItemUsed
PositionCommand
*/


class Minecraft extends EventEmitter2 {

    constructor() {
        super();

        // API のバージョン
        this.version = 1;

        // リクエスト ID
        this.id = 0;


        this.requestSubscribe('PlayerMessage');
        this.requestSubscribe('PlayerTravelled');


        feeles.ipcRenderer.on('responseFromApp', (sender, data) => {

            data = JSON.parse(data);

            // イベントが送られてきたら
            if (data.header.messagePurpose === 'event') {

                const { eventName } = data.body;
                this.emit(eventName, data);

            }

            console.info(data);

        });

    }

    send(purpose, type, body) {
        feeles.ipcRenderer.sendToHost('sendToApp', {
            body,
            header: {
                messagePurpose: purpose,
                messageType: type,
                requestId: (this.id++).toString(),
                version: this.version
            }
        });
    }


    requestSubscribe(eventName) {
        this.send('subscribe', 'commandRequest', {
            eventName
        });
    }


    getPos(x, y, z, relative = true) {
        return {
            x,
            xrelative: relative,
            y,
            yrelative: relative,
            z,
            zrelative: relative,
        };
    }

    locate(x, y, z, relative) {
        this.send('commandRequest', 'commandRequest', {
            name: 'tp',
            input: {
                destination: this.getPos(x, y, z, relative)
            },
            origin: { type: 'player' },
            overload: 'selfToPos',
            version: this.version
        });
    }

    locateTo(x, y, z) {
        this.locate(x, y, z, false);
    }

    locateBy(x, y, z) {
        this.locate(x, y, z, true);
    }


    setBlock(name, x, y, z) {

        const [name, tileData] = name.split(':');

        this.send('commandRequest', 'commandRequest', {
            name: 'setblock',
            input: {
                position: this.getPos(x, y, z),
                tileData: tileData | 0,
                tileName: name
            },
            origin: {
                type: 'player'
            },
            overload: 'default',
            version: this.version
        });
    }



    kill(name, selector = 'allPlayers') {
        this.send('commandRequest', 'commandRequest', {
            name: 'execute',
            input: {
                command: `kill`,
                origin: {
                    rules: [{
                        name: 'name',
                        value: name
                    }],
                    selector
                },
                position: this.getPos(0, 0, 0),
            },
            origin: {
                type: 'player'
            },
            overload: 'asOther',
            version: this.version
        });
    }


    say(text, name, selector = 'allPlayers') {
        this.send('commandRequest', 'commandRequest', {
            name: 'execute',
            input: {
                command: `say ${text}`,
                origin: {
                    rules: [{
                        name: 'name',
                        value: name
                    }],
                    selector
                },
                position: this.getPos(0, 0, 0),
            },
            origin: {
                type: 'player'
            },
            overload: 'asOther',
            version: this.version
        });
    }



}

export default Minecraft;
