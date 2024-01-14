import { Car } from "./trafficLight"

interface TraffigColor{
  getColor(): string
  check(car: Car): void
}
const GREEN = "green"
const YELLOW = "yellow"
const RED = "red"

function nextColor(t: TraffigColor): TraffigColor{
  if(t.getColor() === RED) return new TrafficLight(RED)
  else if (t.getColor() === GREEN) return new TrafficLight(GREEN)
  else if (t.getColor() === YELLOW) return new TrafficLight(YELLOW)
}

function handle(car: Car, light: TrafficLight):void{
  if(light.getColor() === GREEN){
    car.drive() 
  } else  if(light.getColor() === YELLOW){
    car.drive() 
  } else if (light.getColor() === RED){
    car.stop() 
  }
}

class TrafficLight implements TraffigColor{
  constructor(private color: string){}
  getColor(): string { return this.color }
  check(car: Car): void { 
    handle(car, this)
  }
  handle(car: Car, light: TrafficLight):void{
    if(this.getColor() === GREEN){
      car.drive() 
    } else  if(this.getColor() === YELLOW){
      car.drive() 
    } else if (this.getColor() === RED){
      car.stop() 
    }
  }
}
