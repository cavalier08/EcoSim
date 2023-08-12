var width = 150;
var height = 150;
var addition = 2;
var intervalID = 0;

function increaseImage(id) {
    clearInterval(intervalID);
    intervalID = setInterval(function () { zoomInImage(id) }, 1);
}
function decreaseImage(id) {
    clearInterval(intervalID);
    intervalID = setInterval(function () { zoomOutImage(id) }, 1);
}

function zoomInImage(id) {
    if (width < 200) {
        width += addition;
        height += addition;
        document.getElementById(id).style.width = width;
        document.getElementById(id).style.height = height;
        console.log(width);
    } else {
        clearInterval(intervalID);
    }
}
function zoomOutImage(id) {
    if (width > 150) {
        width -= addition;
        height -= addition;
        document.getElementById(id).style.width = width;
        document.getElementById(id).style.height = height;
        console.log(width);
    } else {
        clearInterval(intervalID);
    }
}
