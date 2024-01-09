const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface Input {
  isUp(): boolean;
  isDown(): boolean;
  isLeft(): boolean;
  isRight(): boolean;
  handle(): void
}

class Right implements Input{
  isUp(): boolean { return false; }
  isDown(): boolean { return false  }
  isLeft(): boolean { return false  }
  isRight(): boolean { return true  }
  handle() { map[playery][playerx + 1].moveHorizontal(1) }
}

class Down implements Input{
  isUp(): boolean { return false; }
  isDown(): boolean { return true }
  isLeft(): boolean { return false  }
  isRight(): boolean { return false  }
  handle() {  moveVertical(1) }

}
class Left implements Input{
  isUp(): boolean { return false; }
  isDown(): boolean { return false  }
  isLeft(): boolean { return true }
  isRight(): boolean { return false  }
  handle() { map[playery][playerx -1].moveHorizontal(-1) }

}
class Up implements Input{
  isUp(): boolean { return true; }
  isDown(): boolean { return false  }
  isLeft(): boolean { return false  }
  isRight(): boolean { return false  }
  handle() { moveVertical(-1) }
}
 enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

 interface Tile {
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
  colorTile( g: CanvasRenderingContext2D):void;
  draw(y: number, x: number, g: CanvasRenderingContext2D): void;
  isEdible(): boolean;
  isPushable(): boolean;
  moveHorizontal(dx: number): void;
}

class Air implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) {}
  draw(y: number, x: number, g: CanvasRenderingContext2D) { this.colorTile(g) }
  isEdible(): boolean { return true}
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) { moveToTile(playerx + dx, playery);}
}

 class Flux implements Tile{
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
  colorTile( g: CanvasRenderingContext2D) { g.fillStyle = "#ccffcc"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return true }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) { moveToTile(playerx + dx, playery) }  
}

 class Unbreakble implements Tile{
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
  colorTile( g: CanvasRenderingContext2D) {g.fillStyle = "#999999"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {  }  
}

 class Player implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) {  }
  draw(y: number, x: number, g: CanvasRenderingContext2D) { this.colorTile(g)}
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {  }  
}

 class FallingStone implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) {g.fillStyle = "#0000cc";}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {}  
}

 class Stone implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) {g.fillStyle = "#0000cc";}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return true }
  moveHorizontal(dx: number) {
    if (map[playery][playerx + dx + dx].isAir() && map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = this;
      moveToTile(playerx + dx, playery);
    }
  }  
}

 class Box implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) { g.fillStyle = "#8b4513"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return true }
  moveHorizontal(dx: number) {
     if (map[playery][playerx + dx + dx].isAir()
      && map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = this;
      moveToTile(playerx + dx, playery);
    } 
  }  
}

 class FallingBox implements Tile{
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
  colorTile( g: CanvasRenderingContext2D) {  g.fillStyle = "#8b4513"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {  }  
}

 class Key1 implements Tile{
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
  colorTile( g: CanvasRenderingContext2D) { g.fillStyle = "#ffcc00"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {
      removeLock1();
      moveToTile(playerx + dx, playery);
  }  
}

 class Lock1 implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) { g.fillStyle = "#ffcc00"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {  }  
}

 class Key2 implements Tile{
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
  colorTile( g: CanvasRenderingContext2D) { g.fillStyle = "#00ccff"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {
      removeLock2();
      moveToTile(playerx + dx, playery);
  }  
}

 class Lock2 implements Tile{
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
  colorTile(g: CanvasRenderingContext2D) { g.fillStyle = "#ffcc00"}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.colorTile(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false }
  isPushable(): boolean { return false }
  moveHorizontal(dx: number) {}  
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][];
let inputs: Input[] = [];

function asserExhausted(x: never): never{
  throw new Error("unexpected objct: " + x)
}


function transformTile(tile: RawTile): Tile{
  switch(tile){
    case RawTile.AIR: return new Air();
    case RawTile.FLUX: return new Flux();
    case RawTile.UNBREAKABLE: return new Unbreakble();
    case RawTile.PLAYER: return new Player();
    case RawTile.STONE: return new Stone();
    case RawTile.FALLING_STONE: return new FallingStone();
    case RawTile.BOX: return new Box();
    case RawTile.FALLING_BOX: return new FallingBox();
    case RawTile.KEY1: return new Key1();
    case RawTile.LOCK1: return new Lock1();
    case RawTile.KEY2: return new Key2();
    case RawTile.LOCK2: return new Lock2();
    default: asserExhausted(tile);
  }
}

function transformMap(){
  map = new Array(rawMap.length)
  for(let x=0; x < rawMap.length; x++){
    map[x] = new Array(rawMap[x].length)
    for(let y=0; y < rawMap[x].length; y++){
      map[x][y] = transformTile(rawMap[x][y])
    }
  }
}

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx].isFlux()
    || map[playery + dy][playerx].isAir()) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey1()) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey2()) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
}

function update() {
  updateInputs();
  updateMap();
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(y, x);
    }
  }
}

function updateTile(y: number, x: number) {
  if ((map[y][x].isStone() || map[y][x].isFallingStone())
    && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if ((map[y][x].isBox() || map[y][x].isFallingbox())
    && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone();
  } else if (map[y][x].isFallingbox()) {
    map[y][x] = new Box();
  }
}

function updateInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle()
  }
}

function draw() {
  let g = createGrafics();
  drawMap(g);
  drawPlayer(g);
}

function createGrafics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(y,x,g)    }
  }
}


function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

