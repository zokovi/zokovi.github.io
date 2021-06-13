// Creates a new canvas element and appends it as a child
// to the parent element, and returns the reference to
// the newly created canvas element

const container = document.querySelector('.drawhere');

init(container, 256, 256, '#ffffff');

const drawingCanvas = document.querySelector('canvas')
const sumbitButton = document.querySelector('.submit');
sumbitButton.addEventListener("click", submits);


function createCanvas(parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    parent.appendChild(canvas.node);
    return canvas;
}

function init(container, width, height, fillColor) {
    var canvas = createCanvas(container, width, height);
    var ctx = canvas.context;
    // define a custom fillCircle method
    ctx.fillCircle = function(x, y, radius, fillColor) {
        this.fillStyle = fillColor;
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius, 0, Math.PI * 2, false);
        this.fill();
    };
    ctx.clearTo = function(fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, width, height);
    };
    ctx.clearTo(fillColor || "#ddd");

    // bind mouse events
    canvas.node.onmousemove = function(e) {
        if (!canvas.isDrawing) {
            return;
        }
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var radius = 1; // or whatever
        var fillColor = '#000000';
        ctx.fillCircle(x, y, radius, fillColor);
        //img = ctx.getImageData(0,0,256,256).data;
    };
    canvas.node.onmousedown = function(e) {
        canvas.isDrawing = true;
    };
    canvas.node.onmouseup = function(e) {
        canvas.isDrawing = false;
        //predict(input)
    };
}

// ZERO ARRAY
function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
}

function convert(img, width, height){
  var pixels = img;
  var w = width;
  var h = height;

  var l = w * h;
  img_2D = zeros([256, 256])

  for (var i = 0; i < l; i++) {
    // get color of pixel
    var r = 255 - pixels[i*4] ; // Red
    var g = 255 - pixels[i*4+1]; // Green
    var b = 255 - pixels[i*4+2]; // Blue
    var a = 255 - pixels[i*4+3]; // Alpha
    // get the position of pixel
    var y = parseInt(i / w, 10);
    var x = i - y * w;
    
    if ((r+g+b)/3 > 200){
      img_2D[x][y] = 1.0
    }
    else {
      img_2D[x][y] = 0.0
    }    
  }
  return img_2D
}

function predict(test){
  window.model.predict([tf.tensor(test).reshape([1,256,256,1])]).array().then(function(result){
    window.result = result;
  })
}

createCanvas(document.querySelector(".result"), 256, 256)

function submits(event){
  event.preventDefault();
  test = convert(drawingCanvas.getContext("2d").getImageData(0,0,256,256).data, 256, 256)
  console.log(test)
  //console.log(tf.tensor(test).reshape([1,256,256]));
  if (!window.model){
    tf.loadLayersModel('static/model/model.json').then(function(model) {
      window.model = model;
      predict(test)
    });
    //console.log('model loaded successfully')
  }
  else {
    predict(test)
  }

}

