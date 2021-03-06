import blockNames from 'block-names';

import MinecraftBlockManager from 'block-manager';
import MinecraftEventEmitter from 'event-emitter';


class Minecraft extends MinecraftEventEmitter {

	constructor() {
		super();


		// API のバージョン
		this.version = 1;

		// リクエスト ID
		this.id = 0;


		this.requestSubscribe('PlayerMessage');
		this.requestSubscribe('PlayerTravelled');

		this.requestSubscribe('BlockPlaced');
		this.requestSubscribe('BlockBroken');

		this.blocks = {};


		this.listeners = {};



		this.on('BlockPlaced', (data) => {

			const type = data.body.properties.Type;
			const blockName = blockNames[type];

			this.blocks[blockName].emit('placed', {


			});

		});




		this.on('BlockBroken', (data) => {

			const type = data.body.properties.Type;
			const blockName = blockNames[type];


			this.blocks[blockName].emit('broken', {


			});

		});


		for (const key of Object.keys(blockNames)) {
			const blockName = blockNames[key];
			this.blocks[blockName] = new MinecraftBlockManager(blockName, this);
		}


		feeles.ipcRenderer.on('responseFromApp', (sender, data) => {

			data = JSON.parse(data);

			// イベントが送られてきたら
			if (data.header.messagePurpose === 'event') {

				const {
					eventName
				} = data.body;
				this.emit(eventName, data);

			}

			if (data.header.messagePurpose === 'commandResponse') {


				const id = data.header.requestId;

				this.listeners[id](data);
				delete this.listeners[id];

			}


			console.info(data);

		});

	}

	send(purpose, type, body, idv = 0) {

		const id = this.id++;

		feeles.ipcRenderer.sendToHost('sendToApp', {
			body,
			header: {
				messagePurpose: purpose,
				messageType: type,
				requestId: id.toString(),
				version: this.version
			}
		});

		return new Promise((resolve) => {
			this.listeners[id] = resolve;
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
			origin: {
				type: 'player'
			},
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


	setBlock(_name, x, y, z, relative = true) {

		const [name, tileData] = _name.split(':');

		this.send('commandRequest', 'commandRequest', {
			name: 'setblock',
			input: {
				position: this.getPos(x, y, z, relative),
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


	commandRequest(name) {

		return this.send('commandRequest', 'commandRequest', {
			name,
			input: {},
			origin: {},
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


	setTime(time) {
		this.send('commandRequest', 'commandRequest', {
			name: 'time set',
			input: {
				time
			},
			origin: {
				type: 'player'
			},
			overload: 'byNumber',
			version: this.version
		});
	}



}

export default Minecraft;
