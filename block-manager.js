import Minecraft from 'minecraft';

class MinecraftBlockManager extends EventEmitter2 {
	constructor(name, minecraftInstance) {
		super();

		this.name = name;
		this.minecraftInstance = minecraftInstance;

	}


	put(x, y, z, relative = true) {

		this.minecraftInstance.setBlock(this.name, x, y, z, relative);

	}

}

export default MinecraftBlockManager;
