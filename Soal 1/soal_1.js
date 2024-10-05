function fibonacci(rows,columns){
  const data = [0,1]
  const n = rows * columns
  let str = ''
  for (let index = 2; index < n; index++) {
    data.push(data[index-1] + data[index-2])    
  }
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      str += data[x * columns + y] +"\t"  
    } 
    str += "\n"
  }
  return str
}

console.log(fibonacci(6,6));
