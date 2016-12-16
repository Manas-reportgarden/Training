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

var checkNumber = (function () {
  var primes = {};
  return function (inputNumber) {
    if(primes[inputNumber]){
      return inputNumber + " "+ primes[inputNumber];
    }
    if(isPrime(inputNumber)){
      primes[inputNumber] = " is a prime";
      return inputNumber + " is prime";
    }
    primes[inputNumber] = " is not a prime";
    return inputNumber + " is not prime";;}
  })();

  $( document ).ready(function() {
    $("#submit").click(function(){
      var inputNumber = $("#inputNumber").val();
      if(inputNumber <= 0) return $('#result').html(inputNumber + "is not valid!");
      $('#result').html(checkNumber(inputNumber));
    });
  });
