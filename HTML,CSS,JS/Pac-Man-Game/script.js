const canvas = document.getElementById("gameCanvas");
const score = document.getElementById("score");
const lives = document.getElementById("lives");

const cxt = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    cxt.fillStyle = "blue";
    cxt.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({ position }) {
    this.position = position;
    this.radius = 15;
    this.speed = 4;
    this.dx = 0;
    this.dy = 0;
  }

  draw() {
    cxt.beginPath();
    cxt.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    cxt.fillStyle = "yellow";
    cxt.fill();
    cxt.closePath();
  }

  update = () => {
    this.draw();
    this.move();
  };

  move() {
    this.position.x += this.dx;
    this.position.y += this.dy;
  }
}

const map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
];

function drawMap() {
  map.forEach((row, i) => {
    row.forEach((segment, j) => {
      switch (segment) {
        case "-":
          const boundary = new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          });
          boundary.draw();
          break;
      }
    });
  });
}

const p1 = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
});

function mainAnimation() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  p1.update();
  drawMap();
  requestAnimationFrame(mainAnimation);
}

mainAnimation();

function onKeydown(e) {
  if (e.key === "ArrowRight") {
    p1.dx = p1.speed;
    p1.dy = 0;
  } else if (e.key === "ArrowLeft") {
    p1.dx = -p1.speed;
    p1.dy = 0;
  } else if (e.key === "ArrowUp") {
    p1.dy = -p1.speed;
    p1.dx = 0;
  } else if (e.key === "ArrowDown") {
    p1.dy = p1.speed;
    p1.dx = 0;
  }
}

function onKeyup(e) {
  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown"
  ) {
    p1.dx = 0;
    p1.dy = 0;
  }
}

document.addEventListener("keydown", onKeydown);
document.addEventListener("keyup", onKeyup);
