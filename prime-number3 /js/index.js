var isPrime = (function(){
  return function(inputNumber){
    var flag = 0;
    for(var i=2;i<=inputNumber/2;i++){
      if (inputNumber % i == 0){
        flag = 1;
        break;
      }
    }
    if (flag == 1)
    return false;
    else
    return true;
  }
})();

var isPresent = (function(){
  return function(inputNumber, primes){
    for(var key in primes){
      if(key == inputNumber)
      return true;
    }
    return false;
  };
})();

var checkNumber = (function () {
  var primes = {};
  var counter = 0;
  return function (inputNumber) {
    if(isPresent(inputNumber, primes)){
      return inputNumber + " Is a prime"
    }
    if(isPrime(inputNumber)){
      primes[inputNumber] = " is a prime";
      return inputNumber + " is prime";
    }
    return inputNumber + " is not prime";;}
  })();

  function myFunction(){
    var inputNumber = $("#inputNumber").val();
    if(inputNumber <= 0) return $('#result').html(inputNumber + "is not valid!");
    $('#result').html(checkNumber(inputNumber));
  }
