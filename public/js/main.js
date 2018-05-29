
function deleteTask(link){
var listItem = link.parentNode;
    listItem.classList="animate";
    setTimeout(function(){
    var ul = listItem.parentNode;
    ul.removeChild(listItem); 
    
}, 1500); 
}