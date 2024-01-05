
interface TrafficLight {
  isRed(): boolean;
  isGreen():boolean;
  isYellow(): boolean;
  updateCar(): void;
}
class Green implements TrafficLight{
  isRed(): boolean { return false }
  isGreen(): boolean { return true }
  isYellow(): boolean { return false }
  updateCar(){car.drive()}
  
}
class Yellow implements TrafficLight{
  isRed(): boolean { return false}
  isGreen(): boolean { return false }
  isYellow(): boolean { return true }
  updateCar(){ car.drive() }
}

class Red implements TrafficLight{
  isRed(): boolean { return true }
  isGreen(): boolean { return false }
  isYellow(): boolean { return false }
  updateCar(){car.stop() }  
}

class Car{
stop(){
  console.log("car stopped")
}
drive(){
  console.log("car drives")
}
}

const CYCLE = [new Red(), new Green(), new Yellow()];
const car = new Car()
function updateCarForLight(current: TrafficLight){ current.updateCar()}


