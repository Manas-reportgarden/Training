var add = (function(){
  var count = 0;
  return function() {return count+=1;}
})();
$( document ).ready(function() {
  var val = 0;
  var interval = setInterval(function(){
    val = val +1;
    $('#progressBar').progressbar({value: val});
    $('#status').text(val + '%');
    if (val == 100){
      clearInterval(interval);
    }
  }, 600)
  console.log( "ready!" );
  $( 'button' ).on('click', function(){
    $('#nId').html(add());
  })
});
