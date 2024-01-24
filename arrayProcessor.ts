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

class BatchProcessor{
  constructor( private processor: Processor){ }
  process(arr: number[]){
    for(let i: number; i < arr.length; i++){
      this.processor.processElement(arr[i])
    }
    return this.processor.getAccumulator()
  }
}