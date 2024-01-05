
interface TrafficLight {
  updateCar(): void;
}
class Green implements TrafficLight{
  updateCar(){car.drive()}
  
}
class Yellow implements TrafficLight{
  updateCar(){ car.drive() }
}

class Red implements TrafficLight{
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


