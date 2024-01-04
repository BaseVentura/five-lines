enum TrafficLight{
  RED, YELLOW, GREEN
}
class Car{
stop(){
  console.log("car stopped")
}
drive(){
  console.log("car drives")
}
}

const CYCLE = [TrafficLight.RED, TrafficLight.GREEN, TrafficLight.YELLOW];
const car = new Car()
function updateCarForLight(current: TrafficLight){
  if(current === TrafficLight.RED) car.stop();
  else car.drive()
}


