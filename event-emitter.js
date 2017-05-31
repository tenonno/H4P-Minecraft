import synonyms from 'synonyms';

class MinecraftEventEmitter extends EventEmitter2 {

	emit(name, ...args) {

		const onName = 'on' + name[0].toUpperCase() + name.substr(1);
		const synonym = synonyms[name];
		const onSynonym = 'on' + synonym;

		if (onName in this) {
			this[onName](...args);
		}

		if (synonym && onSynonym in this) {
			this[onSynonym](...args);
		}

		super.emit(name, ...args);

	}

};

export default MinecraftEventEmitter;
