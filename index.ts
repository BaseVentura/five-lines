const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface Input {
  handle(): void
}

class Right implements Input{
  handle() { map[playery][playerx + 1].moveHorizontal(1) }
}

class Down implements Input{
  handle() {  map[playery + 1][playerx].moveVertical(1) }
}
class Left implements Input{
  handle() { map[playery][playerx -1].moveHorizontal(-1) }
}
class Up implements Input{
  handle() { map[playery -1][playerx].moveVertical(-1) }
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

interface FallingState{
  isFalling(): boolean
  moveHorizontal(tile: Tile, dx: number):void
}

class Falling implements FallingState{
  isFalling(): boolean { return true }
  moveHorizontal(tile: Tile, dx: number) {  }
  } 

class Resting implements FallingState{
  isFalling(): boolean { return false  }
  moveHorizontal(tile: Tile, dx: number) {
      if (map[playery][playerx + dx + dx].isAir() && map[playery + 1][playerx + dx].isAir()) {
        map[playery][playerx + dx + dx] = tile;
        moveToTile(playerx + dx, playery);
      }
  } 
}

 interface Tile {
  isAir(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean
  isFallingbox(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  draw(y: number, x: number, g: CanvasRenderingContext2D): void;
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
  isStony(): boolean;
  isBoxy(): boolean;
  isFalling(): boolean;
  rest(): void;
  drop(): void;
}

class Air implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return true}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {}
  moveHorizontal(dx: number) { moveToTile(playerx + dx, playery) }
  moveVertical(dy: number) { moveToTile(playerx, playery + dy) }
  isStony(): boolean { return false }
  isBoxy(): boolean { return false }
  isFalling(): boolean { return false}
}

 class Flux implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return }
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#ccffcc"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) { moveToTile(playerx + dx, playery) }  
  moveVertical(dy: number) { moveToTile(playerx, playery + dy) }
  isFalling(): boolean { return false}
}

 class Unbreakble implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return }
  isFalling(): boolean { return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#999999"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {  }  
  moveVertical(dy: number) {}
}

 class Player implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return false}
  isFalling(): boolean { return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {}
  moveHorizontal(dx: number) {  }  
  moveVertical(dy: number) {}
}

 class Stone implements Tile{
  constructor(private falling: FallingState){}
   rest(): void { this.falling = new Resting()   }
   drop(): void { this.falling = new Falling()   }
  isAir(): boolean {return false }
  isStone(): boolean {return true}
  isFallingStone(): boolean {return this.falling.isFalling()}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return this.isStone() || this.isFallingStone() }
  isBoxy(): boolean { return false}
  isFalling(): boolean { return this.falling.isFalling()}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {this.falling.moveHorizontal(this, dx)
  }  
  moveVertical(dy: number) {  }
}

 class Box implements Tile{
  constructor(private falling: FallingState){}
   rest(): void { this.falling = new Resting()   }
   drop(): void {this.falling = new Falling()   }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return true}
  isFallingbox(): boolean {return this.falling.isFalling()}
  isFalling(): boolean {return this.falling.isFalling()}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return this.isBox() || this.isFallingbox()}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#8b4513"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    this.falling.moveHorizontal(this,dx)
  }  
  moveVertical(dy: number) {}
}

 class Key1 implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return false }
  isFalling(): boolean { return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#ffcc00"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
      removeLock1();
      moveToTile(playerx + dx, playery);
  }  
  moveVertical(dy: number) {
      removeLock1();
      moveToTile(playerx, playery + dy);
  }
}

 class Lock1 implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return true}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return false}
  isFalling(): boolean { return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#ffcc00"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {  }  
  moveVertical(dy: number) {}
}

 class Key2 implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  isStony(): boolean { return false }
  isBoxy(): boolean { return false}
  isFalling(): boolean { return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#00ccff"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
      removeLock2();
      moveToTile(playerx + dx, playery);
  }  
  moveVertical(dy: number) {
      removeLock2();
      moveToTile(playerx, playery + dy);
  }
}

 class Lock2 implements Tile{
  rest(): void {  }
  drop(): void {  }
  isAir(): boolean {return false}
  isStone(): boolean {return false}
  isFallingStone(): boolean {return false}
  isBox(): boolean {return false}
  isFallingbox(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return true}
  isStony(): boolean { return false }
  isBoxy(): boolean { return false }
  isFalling(): boolean { return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#ffcc00"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}  
  moveVertical(dy: number) {  }
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
    case RawTile.STONE: return new Stone(new Resting());
    case RawTile.FALLING_STONE: return new Stone(new Falling());
    case RawTile.BOX: return new Box(new Resting());
    case RawTile.FALLING_BOX: return new Box(new Falling());
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
  if ((map[y][x].isStony())
    && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Stone(new Falling());
    map[y][x] = new Air();
  } else if ((this.isBox())
    && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Box(new Falling());
    map[y][x] = new Air();
  } else if (map[y][x].isFalling()) {
    map[y][x].rest()
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

