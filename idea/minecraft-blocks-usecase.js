import Minecraft from 'minecraft';
const minecraft = new Minecraft();

const blocks = minecraft.blocks;

// 金をこわすと、
blocks.gold.onBroken = event => {
  // 石になる (event と setBlock の使い方は適当)
  blocks.stone.put(event.pos);
};

// PlayerBounced が何か分からないけど
minecraft.onPlayerBounced = event => {
  // もっとも近い石が
  const stone = blocks.stone.near;
  // ちょっと上に行く
  stone.move(0, 1, 0);
};

// 石がでると、
blocks.stone.onPlaced = event => {
  // インベントリに関係なく超自然がとなりに金を作り出す
  const { x, y, z } = event.pos;
  blocks.gold.put(x + 1, y, z);
};
