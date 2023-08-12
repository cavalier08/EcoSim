var width = 150;
var addition = 1;
var intervalID = 0;

function increaseImage(id){
    clearInterval(intervalID);
    intervalID = setInterval(function() {zoomInImage(id)}, 1);
}
function decreaseImage(id){
    clearInterval(intervalID);
    intervalID = setInterval(function() {zoomOutImage(id)}, 1);
}

function zoomInImage(id){
    if(width<200){
        width += addition;
        document.getElementById(id).style.width = width; 
        console.log(width);
    } else{
        clearInterval(intervalID);
    }
}
function zoomOutImage(id){
    if(width>150){
        width -= addition;
        document.getElementById(id).style.width = width; 
        console.log(width);
    } else{
        clearInterval(intervalID);
    }
}
