
function setup() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'green';
	ctx.fillRect(10, 10, 100, 100);

	var img = new Image();
	img.src = "images/me.png";
	ctx.drawImage(img, 0, 0);

	img.style.display = 'none';
  	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  	var data = imageData.data;

  	var grayscale = function() {
	    for (var i = 0; i < data.length; i += 4) {
	      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
	      data[i]     = avg; // red
	      data[i + 1] = avg; // green
	      data[i + 2] = avg; // blue
	    }
    	ctx.putImageData(imageData, 0, 0);
  	};

  	canvas.addEventListener('click', grayscale);

  	var blockAverage = function(img, x, y) {
  		avg = 0;
  		for (var i = 0; i < 4 * (y + 4); i++) {
  			for (var j = 0; j < 4 * (x + 4); j++) {
  				avg += data[y * img.width + x];
  			}
  		}
  		avg /= 8;
  	}
}
// function name(picture) {
// 	var pic = 
// }