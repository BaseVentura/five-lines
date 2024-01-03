function minimum(arr: number[][]){
  let result = Number.POSITIVE_INFINITY;
  for (let x=0; x < arr.length; x++){
    for (let y=0; y< arr[x].length; y++){
      min(result, arr[x][y])
    }
  }
  return result
}

function min(result: number, tmp: number){
  if(result > tmp){
    result = tmp;
  }
}


