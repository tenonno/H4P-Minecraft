// minecraft.blocks.XXX のコンストラクタ
// イベントハンドリングが主体
class MinecraftBlockManager extends EventEmitter {
  constructor(name) {
    // ブロックの種類
    this.name = name;

    // ...on や emit は普通に使えるという前提
  }

  put(...args) {
    // そのブロックをおく
  }

  putBy(...args) {
    // そのブロックを自分を中心にした相対座標におく
  }

  get first() {
    // その種類のブロックのうち、自分がもっと早く置いた (FIFO)
    //   ブロックの MinecraftBlock インスタンスをかえす
  }

  get last() {
    // this.first の逆 (略)
  }

  get all() {
    // 全部 (全部ってなんだ?)
  }

  get near() {
    // その種類のブロックのうち、自分からもっとも距離が近い
    //   ブロックの MinecraftBlock インスタンスをかえす
  }

  get far() {
    // this.near の逆 (略)
  }

  remove() {
    // for (const block of this.all) {
    //   block.remove();
    // }
    //
    // // のシノニム (いらないかも)
  }
}

// minecraft.blocks.XXX.first で取得できるブロックのコンストラクタ
class MinecraftBlock {
  // position を取得/設定する. 名前はコマンドより
  get pos() {}
  set pos(...args) {}
  // ブロックの種類を文字列で取得する
  get name() {}

  remove() {
    // そのブロックをこわす
  }

  obtain() {
    // そのブロックをこわして、アイテムとしてインベントリに入れる (可能なのか？)
  }

  move(...args) {
    // x, y, z の分だけ今の位置から移動する
  }
}
