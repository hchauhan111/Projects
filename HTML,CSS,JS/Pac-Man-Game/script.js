const canvas = document.getElementById("gameCanvas");
const score = document.getElementById("score");
const lives = document.getElementById("lives");

const cxt = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    cxt.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Pellets {
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    cxt.beginPath();
    cxt.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    cxt.fillStyle = "white";
    cxt.fill();
    cxt.closePath();
  }
}

class Player {
  constructor({ position }) {
    this.position = position;
    this.radius = 18;
    this.speed = 2;
    this.dx = 0;
    this.dy = 0;
    this.nextDx = 0;
    this.nextDy = 0;
  }

  draw() {
    cxt.beginPath();
    cxt.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    cxt.fillStyle = "yellow";
    cxt.fill();
    cxt.closePath();
  }

  collisionPlayerWithWall({ dx, dy }) {
    let isCollidingWithWalls = false;
    boundaries.forEach((boundary) => {
      if (
        this.position.x + this.radius + dx >= boundary.position.x &&
        this.position.x - this.radius + dx <=
          boundary.position.x + boundary.width &&
        this.position.y + this.radius + dy >= boundary.position.y &&
        this.position.y - this.radius + dy <=
          boundary.position.y + boundary.height
      ) {
        isCollidingWithWalls = true;
      }
    });
    return isCollidingWithWalls;
  }

  move() {
    if (!this.collisionPlayerWithWall({ dx: this.nextDx, dy: this.nextDy })) {
      this.dx = this.nextDx;
      this.dy = this.nextDy;
    }
    if (!this.collisionPlayerWithWall({ dx: this.dx, dy: this.dy })) {
      this.position.x += this.dx;
      this.position.y += this.dy;
    }
  }

  update() {
    this.draw();
    this.move();
  }
}

const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

const pellets = [];
let boundaries = [];

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function collisionPelletsWithPlayer() {
  for (let i = pellets.length - 1; i >= 0; i--) {
    const pellet = pellets[i];
    if (
      Math.hypot(
        pellet.position.x - p1.position.x,
        pellet.position.y - p1.position.y
      ) <
      p1.radius + pellet.radius
    ) {
      pellets.splice(i, 1);
    }
  }
}

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("img/pipeHorizontal.png"),
          })
        );
        break;
      case "|":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeVertical.png"),
          })
        );
        break;
      case "1":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner1.png"),
          })
        );
        break;
      case "2":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner2.png"),
          })
        );
        break;
      case "3":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner3.png"),
          })
        );
        break;
      case "4":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/pipeCorner4.png"),
          })
        );
        break;
      case "b":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage("./img/block.png"),
          })
        );
        break;
      case "[":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capLeft.png"),
          })
        );
        break;
      case "]":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capRight.png"),
          })
        );
        break;
      case "_":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capBottom.png"),
          })
        );
        break;
      case "^":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/capTop.png"),
          })
        );
        break;
      case "+":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/pipeCross.png"),
          })
        );
        break;
      case "5":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorTop.png"),
          })
        );
        break;
      case "6":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorRight.png"),
          })
        );
        break;
      case "7":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorBottom.png"),
          })
        );
        break;
      case "8":
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            image: createImage("./img/pipeConnectorLeft.png"),
          })
        );
        break;
      case ".":
        pellets.push(
          new Pellets({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2,
            },
          })
        );
        break;
    }
  });
});

function drawMap() {
  boundaries.forEach((boundary) => boundary.draw());
}

function drawPellets() {
  pellets.forEach((pellet) => pellet.draw());
}

const p1 = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
});

function mainAnimation() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPellets();
  collisionPelletsWithPlayer();
  p1.update();
  requestAnimationFrame(mainAnimation);
}

mainAnimation();

function onKeydown(e) {
  if (e.key === "ArrowRight") {
    p1.nextDx = p1.speed;
    p1.nextDy = 0;
  } else if (e.key === "ArrowLeft") {
    p1.nextDx = -p1.speed;
    p1.nextDy = 0;
  } else if (e.key === "ArrowUp") {
    p1.nextDy = -p1.speed;
    p1.nextDx = 0;
  } else if (e.key === "ArrowDown") {
    p1.nextDy = p1.speed;
    p1.nextDx = 0;
  }
}

document.addEventListener("keydown", onKeydown);
