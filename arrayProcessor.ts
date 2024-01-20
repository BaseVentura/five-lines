interface Processor {
  processElement(element: number): void;
  getAccumulator(): number; 
}

class MinProcessor implements Processor{
  constructor(private accumulator: number){}
  getAccumulator(): number{return this.accumulator}
  processElement(element: number): void {
      if(this.accumulator > element) this.accumulator = element
    
  }
}
class SumProcessor implements Processor{
  constructor(private accumulator: number){}
  getAccumulator(): number {
    return this.accumulator
  }
  processElement(element: number){
    this.accumulator += element
  }
}


class ArrayMinimum{
  processor: Processor
  constructor( accumulator: number){
    this.processor = new MinProcessor(accumulator)
  }
  process(arr: number[]){
    for(let i: number; i<arr.length; i++){
      this.processor.processElement(arr[i])    
    }
    return this.processor.getAccumulator()
  }
}

class ArraySum{
  processor: Processor
  constructor( accumulator: number){
    this.processor = new SumProcessor(accumulator)
    }
  process(arr: number[]){
    for(let i: number; i < arr.length; i++){
      this.processor.processElement(arr[i])
    }
    return this.processor.getAccumulator()
  }
}