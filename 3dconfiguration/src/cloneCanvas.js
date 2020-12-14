
var cloneCanvas = function(canvas) {
    var newCanvas = document.createElement('CANVAS');
    var context = newCanvas.getContext('2d');

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    context.drawImage(canvas, 0, 0);

    return newCanvas;
}

export default cloneCanvas;