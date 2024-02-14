const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface Input {
  handle(): void
}

class Right implements Input{
  handle() { player.moveHorizontal(1) }
}

class Down implements Input{
  handle() {  player.moveVertical(1) }
}
class Left implements Input{
  handle() { player.moveHorizontal(-1) }
}
class Up implements Input{
  handle() { player.moveVertical(-1) }
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
  moveHorizontal(player: Player, tile: Tile, dx: number):void
  drop(tile: Tile, x:number, y:number):void
}

class Falling implements FallingState{
  isFalling(): boolean { return true }
  moveHorizontal(player: Player, tile: Tile, dx: number) {  }
  drop(tile: Tile, x: number, y: number){
      map[y + 1][x] = tile
      map[y][x] = new Air();
 }
  } 

class Resting implements FallingState{
  isFalling(): boolean { return false  }
  moveHorizontal(player: Player, tile: Tile, dx: number) {
      player.pushHorizontal(tile, dx)
  } 
  drop(tile: Tile, x: number, y: number){  }
}

class KeyConfiguration{
  constructor(private color: string, private _1: boolean, private removeStrategy: RemoveStrategy){
  }
  public setColor(g: CanvasRenderingContext2D){
    g.fillStyle = this.color
  }
  public is1(): boolean { return this._1 }
  public removeLock(){ remove(this.removeStrategy) }
}

class FallStrategy{
  constructor(private falling: FallingState){}
  update(tile: Tile, x: number, y: number) {
    this.falling = map[y + 1][x].isAir() ? new Falling() : new Resting()
    this.falling.drop(tile,x,y)
 }

 public moveHorizontal(tile: Tile, dx: number){
  this.falling.moveHorizontal(player, tile, dx)
 }
}

 interface Tile {
  isAir(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  draw(y: number, x: number, g: CanvasRenderingContext2D): void;
  moveHorizontal(player: Player, dx: number): void;
  moveVertical(player: Player, dy: number): void;
  update(y:number, x:number):void; 
  getBlockOnTopState(): FallingState;
  
}

class Air implements Tile{
  isAir(): boolean {return true}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {}
  moveHorizontal(player: Player, dx: number) { player.move(1,0) }
  moveVertical(player: Player, dy: number) { player.move(0,1) }
  update(y: number, x: number) {  }
  getBlockOnTopState(): FallingState {
    return new Falling();
  }
}

 class Flux implements Tile{
  isAir(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#ccffcc"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) { player.move(1,0) }  
  moveVertical(player: Player, dy: number) { player.move(0,1) }
  update(y: number, x: number) {  }
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

 class Unbreakble implements Tile{
  isAir(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  update(y: number, x: number) {  }
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#999999"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {  }  
  moveVertical(palyer: Player, dy: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

 class PlayerTile implements Tile{
  isAir(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  update(y: number, x: number) {  }
  draw(y: number, x: number, g: CanvasRenderingContext2D) {}
  moveHorizontal(player: Player, dx: number) {}  
  moveVertical(player: Player, dy: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

 class Stone implements Tile{
  private fallStrategy: FallStrategy
  constructor(falling: FallingState){
    this.fallStrategy = new FallStrategy(falling)
  }
  isAir(): boolean {return false }
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  update(y: number, x: number) {
    this.fallStrategy.update(this,x,y)
 }
  draw(y: number, x: number, g: CanvasRenderingContext2D) { 
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {this.fallStrategy.moveHorizontal(this, dx)
  }  
  moveVertical(player: Player, dy: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

 class Box implements Tile{
  private fallStrategy: FallStrategy
  constructor(falling: FallingState){
    this.fallStrategy = new FallStrategy(falling)
  }
  isAir(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  update(y: number, x: number) {this.fallStrategy.update(this,x,y) }
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    g.fillStyle = "#8b4513"
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    this.fallStrategy.moveHorizontal(this,dx)
  }  
  moveVertical(player: Player, dy: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

 class Key implements Tile{
   constructor(private keyConfiguration: KeyConfiguration){}
  isAir(): boolean {return false}
  isLock1(): boolean {return false}
  isLock2(): boolean {return false}
  update(y: number, x: number): void{}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.keyConfiguration.setColor(g) // violates übergeben oder aufrufen
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
      this.keyConfiguration.removeLock();
      player.move( dx, 0);
  }  
  moveVertical(player: Player, dy: number) {
      this.keyConfiguration.removeLock();
      player.move( 0, dy);
  }
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

 class LockTile implements Tile{
  constructor(private keyconfiguration: KeyConfiguration){}
  isAir(): boolean {return false}
  isLock1(): boolean {return this.keyconfiguration.is1()}
  isLock2(): boolean {return !this.keyconfiguration.is1()}
  update(y: number, x: number): void{}
  draw(y: number, x: number, g: CanvasRenderingContext2D) {
    this.keyconfiguration.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {  }  
  moveVertical(player: Player, dy: number) {}
  getBlockOnTopState(): FallingState {
    return new Resting()
  }
}

class Player{
  private x = 1;
  private y = 1;
  draw(g: CanvasRenderingContext2D) {
    g.fillStyle = "#ff0000";
    g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  pushHorizontal(tile: Tile,dx: number){
    if (map[this.y][this.x + dx + dx].isAir() && map[this.y + 1][this.x + dx].isAir()) {
      map[this.y][this.x + dx + dx] = tile;
      this.moveToTile(this.x + dx, this.y);
    }
  }
  move(dx: number, dy: number){
    this.moveToTile(this.x + dx, this.y + dy)
  }

  private moveToTile(newx: number, newy: number) {
    map[this.y][this.x] = new Air();
    map[newy][newx] = new PlayerTile();
    this.x = newx;
    this.y = newy;
  }
  moveHorizontal(dx: number){
    map[this.y][this.x + dx].moveHorizontal(this, dx)
  }

  moveVertical(dy: number){
    map[this.y + dy][this.x].moveVertical(this, dy)
  }
  
}

let player = new Player()

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

class RemoveLock1 implements RemoveStrategy{
  check(tile:Tile) {
    return tile.isLock1();
  }
}

class RemoveLock2 implements RemoveStrategy{
  check(tile:Tile) {
    return tile.isLock2();
  }
}
function assertExhausted(x: never): never{
  throw new Error("unexpected objct: " + x)
}

const YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1())

function transformTile(tile: RawTile): Tile{
  switch(tile){
    case RawTile.AIR: return new Air();
    case RawTile.FLUX: return new Flux();
    case RawTile.UNBREAKABLE: return new Unbreakble();
    case RawTile.PLAYER: return new PlayerTile();
    case RawTile.STONE: return new Stone(new Resting());
    case RawTile.FALLING_STONE: return new Stone(new Falling());
    case RawTile.BOX: return new Box(new Resting());
    case RawTile.FALLING_BOX: return new Box(new Falling());
    case RawTile.KEY1: return new Key(YELLOW_KEY);
    case RawTile.LOCK1: return new LockTile(YELLOW_KEY);
    case RawTile.KEY2: return new Key(new KeyConfiguration( "#00ccff",false, new RemoveLock2()));
    case RawTile.LOCK2: return new LockTile(new KeyConfiguration( "#00ccff",false, new RemoveLock2()));
    default: assertExhausted(tile);
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



interface RemoveStrategy{
  check(tile: Tile): boolean
}

function remove(shouldRemove: RemoveStrategy) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (shouldRemove.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}




function update() {
  updateInputs();
  updateMap();
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].update(y,x)
    }
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
  player.draw(g)
}

function createGrafics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
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

