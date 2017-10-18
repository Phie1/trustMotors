window.location.hashArray = (function(){
  var hashSplit = window.location.hash.substring(1).split("&");
  var toReturn = {};
  for(var i in hashSplit){
    var paramSplit = hashSplit[i].split('=');
    toReturn[paramSplit[0]]=paramSplit[1];
  }
  return toReturn;
})();

$(document).ready(function(){
  console.log(window.location.hashArray);
});

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}