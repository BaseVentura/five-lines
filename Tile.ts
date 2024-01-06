export enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

export interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean
  isFallingbox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
}

export class Air implements Tile{
  isAir(): boolean {return true}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Flux implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return true}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Unbreakble implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return true}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Player implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return true}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class FallingStone implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return true}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Stone implements Tile{
  isAir(): boolean {return false }
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return true}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Box implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return true}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class FallingBox implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return true}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}
export class Key1 implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return true}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Lock1 implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return true}
  isKey2(): boolean {return false}
  isLock2(): boolean {return false}
}

export class Key2 implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return true}
  isLock2(): boolean {return false}
}

export class Lock2 implements Tile{
  isAir(): boolean {return false}
  isFlux(): boolean {return false}
  isUnbreakable(): boolean {return false}
  isPlayer(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isKey1(): boolean {return false}
  isLock1(): boolean {return false}
  isKey2(): boolean {return false}
  isLock2(): boolean {return true}
}




