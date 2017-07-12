
var width, height, blocksx, blocksy, canvas, c, weamap, cache,centerX,centerY,radius, ccity;

function setUp(citybase) {
  ccity = citybase;
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
      $.get("https://dsstore.captainwebservices.com/owa.php?city=" + citybase, function(response) {
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
    console.log(weamap);
  weamap = JSON.parse(weamap2);

   console.log("done");

   var winddir = weamap.wind.deg;
   var windspeed = weamap.wind.speed;
   var temp = Math.round(weamap.main.temp);
   var pressure = weamap.main.pressure;
   var cc = weamap.clouds.all;
   var city = weamap.name;
   var loc = weamap.coord.lat + ", " + weamap.coord.lon;
   x1 = centerX;
   y1 = centerY;
   r =  200;
   console.log("location: " + loc);
   if (city.toLowerCase() != ccity.toLowerCase()) {
     bderror("the city you chose wasn't in thw database. So one of the closesest ones were chosen instead");
   }
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
  var dp = Math.round(computeDew());
  canvas.fillText(dp, centerX - 150, centerY + 80);
  document.getElementById("inf").innerHTML = "<center><table><tr><td><b>City</b></td><td><b>Coordinates</b></td><td><b>Wind Speed</b></td><td><b>Wind Direction</b></td><td><b>Pressure</b></td><td><b>Dew Point</b></td><td><b>Location Link</b></td></tr>" + "<tr><td>" + city + "</td><td>" + loc + "</td><td>" + windspeed + "</td><td>" + winddir + "</td><td>" + pressure + "</td><td>" + dp + "</td><td>https://datonelefty.github.io/Project-Amber/?city=" + city + "</td></tr></table></center>"



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


        computeClouds(weamap.clouds.all);

}


function swipedetect(el, callback){ // from

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

swipedetect (document.getElementById("wea"), function (directionof) {
  if (directionof == "down") {
document.getElementById("sel").style.display = "block";
}
});

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function bderror(error) {
  document.getElementById("iid").innerHTML = error;
  document.getElementById("err").style.display = "block";
}
