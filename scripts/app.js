const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var items = [];
var speed = 30;
var numberOfItems = 120;

var interact = {
  x: 0,
  y: 0
};

for (var i=0; i<numberOfItems; i++) {
  items.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-over";

  for (var i = 0, x = items.length ; i < x ; i++) {
    let z = items[i];

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(z.x, z.y, z.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'yellow';
    ctx.stroke();
  }

  ctx.beginPath();
  for (var i=0, x=items.length; i<x; i++) {
    let item1 = items[i];
    ctx.moveTo(item1.x, item1.y);
    if (distance(interact, item1) < 300) ctx.lineTo(interact.x, interact.y);
     for (var j=0, x=items.length; j<x; j++) {
       let item2 = items[j];
       if (distance(item1,item2) < 100) {
         ctx.lineTo(item2.x, item2.y);
       }
     }
  }

  ctx.lineWidth = 0.1;
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

function distance( point1, point2) {
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt( xs + ys);
}

function update() {
  for (var i = 0, x = items.length; i < x; i++) {
    var s = items[i];

    s.x += s.vx / speed;
    s.y += s.vy / speed;

    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

canvas.addEventListener('mousemove', function(e) {
  interact.x = e.clientX;
  interact.y = e.clientY;
})

function play() {
  animate();
  update();
  requestAnimationFrame(play);
}

play();