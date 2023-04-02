
/////////////////Bkg effect 2 //////////////////////////
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgg = document.getElementById("bg_glow");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight*1.3;

window.onresize = function() {
  w = ctx.canvas.width = window.innerWidth;
  h = ctx.canvas.height = window.innerHeight*1.3;
  maxHeight = h*.5;
  minHeight = h*.5;
  md = 200*(w/1920);
  dots = [];
  pushDots();
  ctx.globalCompositeOperation = "lighter";
};

//document.getElementById("overlay").onclick = function(){
//  hue = Math.random()*360;
//  bgg.style.background = "radial-gradient(ellipse at center, hsla("+hue+",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
//  dots = [];
//  pushDots();
//}

dots=[{}];
mx = 0; my = 0;
md = 200*(w/1920);
maxWidth = 20;
minWidth = 2;
maxHeight = h*.5;
minHeight = h*.5;
maxSpeed = 35;
minSpeed = 6;
hue = 230; //230 og
hueDif = 10; // Hue +/- 50 og
glow = 0; // Set to 0 for better performance
saturation_base = 0;
saturation_delta = 20;
ctx.globalCompositeOperation = "lighter";

function pushDots(num){
  for(i=1; i<md; i++){
    dots.push({
      x:Math.random()*w,
      y:Math.random()*h/2,
      h:Math.random()*(maxHeight-minHeight)+minHeight,
      w:Math.random()*(maxWidth-minWidth)+minWidth,
      c:Math.random()*((hue+hueDif)-(hue-hueDif))+(hue-hueDif),
      m:Math.random()*(maxSpeed-minSpeed)+minSpeed
    });
  }
}pushDots();

function render(){
  ctx.clearRect(0,0,w,h);
  for(i=1; i<dots.length; i++){
    ctx.beginPath();
    grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x+dots[i].w, dots[i].y+dots[i].h);
    grd.addColorStop(.0, "hsla("+dots[i].c+"," + saturation_base + "%,50%,.0)");
    grd.addColorStop(.2, "hsla("+dots[i].c+20+"," + saturation_base + "%,50%,.5)");
    grd.addColorStop(.5, "hsla("+dots[i].c+50+"," + saturation_base + saturation_delta + "%,60%,.8)");
    grd.addColorStop(.8, "hsla("+dots[i].c+80+"," + saturation_base + "%,50%,.5)");
    grd.addColorStop(1., "hsla("+(dots[i].c+100)+"," + saturation_base + "%,50%,.0)");
    ctx.shadowBlur = glow;
    ctx.shadowColor = "hsla("+(dots[i].c)+"," + saturation_base + "%,50%,1)";
    ctx.fillStyle=grd;
    ctx.fillRect(dots[i].x,dots[i].y,dots[i].w,dots[i].h);
    ctx.closePath();
    dots[i].x += dots[i].m/100;
    if(dots[i].x > w+maxWidth){
      dots.splice(i,1);
      dots.push({
        x:0,
        y:Math.random()*h,
        h:Math.random()*(maxHeight-minHeight)+minHeight,
        w:Math.random()*(maxWidth-minWidth)+minWidth,
        c:Math.random()*((hue+hueDif)-(hue-hueDif))+(hue-hueDif),
        m:Math.random()*(maxSpeed-minSpeed)+minSpeed
      });
    }
  }window.requestAnimationFrame(render);
}

bgg.style.background = "radial-gradient(ellipse at center, hsla("+hue+"," + saturation_base + "%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
render();


/////////////////Other //////////////////////////
document.getElementById('name_js').innerHTML = namer;
document.getElementById('name2_js').innerHTML = namer_2;
