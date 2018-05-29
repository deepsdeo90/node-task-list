/*call function on done click to animate and remove li from dom*/
function deleteTask(link){
var listItem = link.parentNode;
    listItem.classList="animate";
    setTimeout(function(){
    var ul = listItem.parentNode;
    ul.removeChild(listItem); 
    
}, 1500); 
}