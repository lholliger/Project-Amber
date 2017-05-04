
var width, height, blocksx, blocksy, canvas, c, weamap, cache,centerX,centerY,radius;

function setUp() {
    c = document.getElementById('wea'),
    canvas = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    canvas.beginPath();
    canvas.rect(0, 0, window.innerWidth, window.innerHeight);
    canvas.fillStyle = "black";
    canvas.fill();

    width = window.innerWidth;
    height = window.innerHeight;
    radius = 70;
    if (canvas.width < 500 || canvas.height < 500) {
      radius = 50;

    }
    centerX = c.width / 2;
    centerY = c.height / 2;

    radius = 70;

    canvas.beginPath();
    canvas.rect(centerX - 150, centerY - 50, 300, 60);
    canvas.fillStyle = "gray";
    canvas.fill();



    canvas.font = "50px Roboto";
    canvas.fillStyle = "black";
    canvas.textAlign = "center";
    canvas.fillText("Loading...",centerX, centerY);
    if (weamap == null) {
      $.get("https://dsstore.captainwebservices.com/owa.php", function(response) {
        cache = response;
        write(response);
       });

    } else {
      write(cache);
    }




  }
  function between(str, p1, p2) {
  return str.substring(str.lastIndexOf(p1)+1,str.lastIndexOf(p2));
  }



  function draw(canvas, angle){
      var context = canvas.getContext('2d'), centerX = Math.floor(canvas.width / 2), centerY = Math.floor(canvas.height / 2),radius = 300;
      context.lineWidth = 5;
      context.strokeStyle = 'white';
      var begin = 0; interval = 360;
      var arcSize= degreesToRadians(interval);
      context.beginPath();
      context.moveTo(centerX,centerY);
      context.arc(centerX,centerY,radius, degreesToRadians(0), degreesToRadians((-1) * angle),false);
      context.closePath();
      context.stroke();
      context.strokeStyle = 'black';
      context.lineWidth = 8;
      for(var startingAngle=begin; startingAngle < 360;){
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.arc(centerX, centerY, radius, degreesToRadians(startingAngle), startingAngle + arcSize, false);
          context.closePath();
          context.stroke();
          startingAngle = startingAngle + interval;
      }
  }

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

function computeDew()
{

    tem2 =  weamap.main.temp;
    r = weamap.main.humidity;
    tem = -1.0*tem2;
    es = 6.112*Math.exp(-1.0*17.67*tem/(243.5 - tem));
    ed = r/100.0*es;
    eln = Math.log(ed/6.112);
    td = -243.5*eln/(eln - 17.67 );
    return td;
}

function write(weamap2) {
  canvas.textAlign = "left";
  weamap = JSON.parse(weamap2);
  console.log(weamap);
   console.log("done");

   var winddir = weamap.wind.deg;
   var windspeed = weamap.wind.speed;
   var temp = weamap.main.temp;
   var pressure = weamap.main.pressure;
   var cc = weamap.clouds.all;
   var city = weamap.name;

   x1 = centerX;
   y1 = centerY;
   r =  200;
   console.log("speed: " + windspeed);
   console.log("direction: " +winddir);
   console.log("city: " + city);
   console.log("pressure: " + pressure);
   console.log("temperature: " + temp);
   console.log("clouds: " + cc);
   console.log("humidity: " + weamap.main.humidity);
/*
   canvas.moveTo(x1, y1);
   canvas.lineTo(tox, toy);
   canvas.stroke();
*/

canvas.beginPath();
canvas.rect(0, 0, window.innerWidth, window.innerHeight);
canvas.fillStyle = "black";
canvas.fill();


  draw(c, winddir);


  canvas.font = "50px Roboto";
  canvas.fillStyle = "white";
  canvas.fillText(pressure ,centerX+80,centerY-80);
  canvas.fillText(temp,centerX-150,centerY-80);
  canvas.fillText(Math.round(computeDew()), centerX - 150, centerY + 80);



        canvas.font = "20px Roboto";
        canvas.fillStyle = "gray";
        canvas.fillText(city ,40,40);

        canvas.beginPath();
        canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        canvas.fillStyle = 'black';
        canvas.fill();
        canvas.lineWidth = 5;
        canvas.strokeStyle = 'white';
        canvas.stroke();



}
