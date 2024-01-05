
interface TrafficLight {
  isRed(): boolean;
  isGreen():boolean;
  isYellow(): boolean;
}
class Green implements TrafficLight{
  isRed(): boolean { return false }
  isGreen(): boolean { return true }
  isYellow(): boolean { return false }
}
class Yellow implements TrafficLight{
  isRed(): boolean { return false}
  isGreen(): boolean { return false }
  isYellow(): boolean { return true }
}

class Red implements TrafficLight{
  isRed(): boolean { return true }
  isGreen(): boolean { return false }
  isYellow(): boolean { return false }
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
function updateCarForLight(current: TrafficLight){
  if(current.isRed()) car.stop();
  else car.drive()
}


