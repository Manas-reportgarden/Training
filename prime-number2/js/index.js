var primes = {};

function checkPrime(inputNumber){
  for(var key in primes){
    if(key == inputNumber)
    return true;
  }
  return false;
}

function isPrime() {
  var flag = 0;
  var inputNumber = document.getElementById('inputNumber').value;
  if(inputNumber <= 0) return document.getElementById('result').innerHTML = inputNumber + " is not valid!"
  if(checkPrime(inputNumber)){
    return document.getElementById('result').innerHTML = inputNumber + " Is a prime number"
  }

  for(var i=2;i<=inputNumber/2;i++){
    if (inputNumber % i == 0){
      flag = 1;
      break;
    }
  }

  if (flag == 1)
    document.getElementById('result').innerHTML = inputNumber + " is not a prime number"
  else{
    primes[inputNumber] = "is a prime"
    document.getElementById('result').innerHTML = inputNumber + " is  prime number"
  }
}
