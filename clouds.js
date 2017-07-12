function computeClouds(cover) {
  change = 70;
console.log("Cover: " + cover);
  canvas.fillStyle = "white";
  var con = true;
  if (cover == 0 && con == true) { // none

    con = false;
  }
  if (cover <= 10 && con == true) { // 1
canvas.beginPath();
canvas.moveTo(centerX,centerY - change);
canvas.lineTo(centerX, centerY + change);
canvas.stroke();
    con = false;


  }

  if (cover <= 30 && con == true) { // 3 or 2

        	var startAngle = Math.PI;
        	var endAngle = Math.PI*1.5;
        	var antiClockwise = false;

        	canvas.beginPath();
        	canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
        	canvas.lineTo(centerX, centerY);
        	canvas.closePath();
        	canvas.fill();
          con = false;

  }


  if (cover <= 40 && con == true) { // 4

          var startAngle = Math.PI;
          var endAngle = Math.PI*1.5;
          var antiClockwise = false;

          canvas.beginPath();
          canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
          canvas.lineTo(centerX, centerY);
          canvas.closePath();
          canvas.fill();

          canvas.beginPath();
          canvas.moveTo(centerX,centerY - change);
          canvas.lineTo(centerX, centerY + change);
          canvas.stroke();
          con = false;

  }

  if (cover <= 50 && con == true) { // 5

    var startAngle = Math.PI;
    var endAngle = Math.PI*1.5;
    var antiClockwise = false;

    canvas.beginPath();
    canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
    canvas.lineTo(centerX, centerY);
    canvas.closePath();
    canvas.fill();
          var startAngle = Math.PI;
          var endAngle = (Math.PI * 0.5);
          var antiClockwise = false;

          canvas.beginPath();
          canvas.arc(centerX, centerY, change, startAngle, endAngle, true);
          canvas.lineTo(centerX, centerY);
          canvas.closePath();
          canvas.fill();
          con = false;



  }

  if (cover <= 60 && con == true) { // 6

    var startAngle = Math.PI;
    var endAngle = Math.PI*1.5;
    var antiClockwise = false;

    canvas.beginPath();
    canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
    canvas.lineTo(centerX, centerY);
    canvas.closePath();
    canvas.fill();
          var startAngle = Math.PI;
          var endAngle = (Math.PI * 0.5);
          var antiClockwise = false;

          canvas.beginPath();
          canvas.arc(centerX, centerY, change, startAngle, endAngle, true);
          canvas.lineTo(centerX, centerY);
          canvas.closePath();
          canvas.fill();

          canvas.beginPath();
          canvas.moveTo(centerX - change,centerY);
          canvas.lineTo(centerX + change, centerY);
          canvas.stroke();
          con = false;

  }

  if (cover <= 80 && con == true) { // 7 and 8

        	var startAngle = 0;
        	var endAngle = Math.PI * 1.5;
        	var antiClockwise = false;

        	canvas.beginPath();
        	canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
        	canvas.lineTo(centerX, centerY);
        	canvas.closePath();
        	canvas.fill();
                  con = false;

  }


if (cover <= 90 && con == true) {


          	var startAngle = 0;
          	var endAngle = Math.PI * 3;
          	var antiClockwise = false;

          	canvas.beginPath();
          	canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
          	canvas.lineTo(centerX, centerY);
          	canvas.closePath();
          	canvas.fill();
            canvas.strokeStyle = "black";
            canvas.beginPath();
            canvas.moveTo(centerX,centerY - change);
            canvas.lineTo(centerX, centerY + change);
            canvas.stroke();
            con = false;

}

if (cover <= 100 && con == true) {


          	var startAngle = 0;
          	var endAngle = Math.PI * 3;
          	var antiClockwise = false;

          	canvas.beginPath();
          	canvas.arc(centerX, centerY, change, startAngle, endAngle, false);
          	canvas.lineTo(centerX, centerY);
          	canvas.closePath();
          	canvas.fill();
            con = false;

}


}
