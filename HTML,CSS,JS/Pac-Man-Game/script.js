const canvas = document.getElementById("gameCanvas");
const scoreEl = document.getElementById("score");

let animationId;
const cxt = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const scoreIncrement = 10;
let score = 0;

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

class Ghost {
  static speed = 2;
  constructor({ position, image, nextDx, nextDy }) {
    this.position = position;
    this.speed = 2;
    this.dx = 0;
    this.dy = 0;
    this.nextDx = nextDx;
    this.nextDy = nextDy;
    this.image = image;
    this.width = Boundary.width - 5;
    this.height = Boundary.height - 5;
    this.previousCollisions = [];
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

  move() {
    if (!collisionGhostWithWalls(this, { dx: this.nextDx, dy: this.nextDy })) {
      this.dx = this.nextDx;
      this.dy = this.nextDy;
    }
    if (!collisionGhostWithWalls(this, { dx: this.dx, dy: this.dy })) {
      this.position.x += this.dx;
      this.position.y += this.dy;
    }
  }

  update() {
    this.draw();
    this.move();
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
      scoreEl.textContent = score;
      score += scoreIncrement;
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

const g1 = new Ghost({
  position: {
    x: 9 * Boundary.width + 2,
    y: 11 * Boundary.height + 2,
  },
  image: createImage("img/blue-ghost.png"),
  nextDx: -Ghost.speed,
  nextDy: 0,
});
const g2 = new Ghost({
  position: {
    x: 9 * Boundary.width + 2,
    y: 1 * Boundary.height + 2,
  },
  image: createImage("img/pink-ghost.jpeg"),
  nextDx: 0,
  nextDy: Ghost.speed,
});
const g3 = new Ghost({
  position: {
    x: 1 * Boundary.width + 2,
    y: 11 * Boundary.height + 2,
  },
  image: createImage("img/green-ghost.png"),
  nextDx: 0,
  nextDy: -Ghost.speed,
});
const ghosts = [g1, g2, g3];

function collisionGhostWithWalls(ghost, { dx, dy }) {
  let ghostCollideWall = false;
  boundaries.forEach((boundary) => {
    if (
      ghost.position.x + ghost.width + 1 + dx >= boundary.position.x &&
      ghost.position.x + dx <= boundary.position.x + boundary.width &&
      ghost.position.y + ghost.height + 1 + dy >= boundary.position.y &&
      ghost.position.y + dy <= boundary.position.y + boundary.height
    ) {
      ghostCollideWall = true;
    }
  });
  return ghostCollideWall;
}

function collisionPlayerWithGhost(ghost) {
  const distX = Math.abs(p1.position.x - (ghost.position.x + ghost.width / 2));
  const distY = Math.abs(p1.position.y - (ghost.position.y + ghost.height / 2));

  if (
    distX > ghost.width / 2 + p1.radius ||
    distY > ghost.height / 2 + p1.radius
  ) {
    return false;
  }

  if (distX <= ghost.width / 2 || distY <= ghost.height / 2) {
    return true;
  }

  const cornerDistanceSq =
    (distX - ghost.width / 2) ** 2 + (distY - ghost.height / 2) ** 2;
  return cornerDistanceSq <= p1.radius ** 2;
}

function endGame() {
  cancelAnimationFrame(animationId);
  cxt.fillStyle = "red";
  cxt.font = "50px Arial";
  cxt.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);

  setTimeout(() => {
    let q = confirm("Restart");
    if (q) {
      location.reload();
    }
  }, 3000);
}

let gameOver = false;
function mainAnimation() {
  if (gameOver) return;
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPellets();
  collisionPelletsWithPlayer();
  p1.update();
  ghosts.forEach((ghost) => {
    ghost.update();
    if (collisionPlayerWithGhost(ghost)) {
      gameOver = true;
      endGame();
    }
    let collisions = [];
    if (collisionGhostWithWalls(ghost, { dx: 0, dy: ghost.speed }))
      collisions.push("down");
    if (collisionGhostWithWalls(ghost, { dx: 0, dy: -ghost.speed }))
      collisions.push("up");
    if (collisionGhostWithWalls(ghost, { dx: ghost.speed, dy: 0 }))
      collisions.push("right");
    if (collisionGhostWithWalls(ghost, { dx: -ghost.speed, dy: 0 }))
      collisions.push("left");

    if (collisions.length > ghost.previousCollisions.length)
      ghost.previousCollisions = collisions;

    if (
      JSON.stringify(ghost.previousCollisions) !== JSON.stringify(collisions)
    ) {
      if (ghost.dx > 0 && !ghost.previousCollisions.includes("right")) {
        ghost.previousCollisions.push("right");
      } else if (ghost.dx < 0 && !ghost.previousCollisions.includes("left")) {
        ghost.previousCollisions.push("left");
      } else if (ghost.dy > 0 && !ghost.previousCollisions.includes("down")) {
        ghost.previousCollisions.push("down");
      } else if (ghost.dy < 0 && !ghost.previousCollisions.includes("up")) {
        ghost.previousCollisions.push("up");
      }
      const pathWays = ghost.previousCollisions.filter((collision) => {
        return !collisions.includes(collision);
      });
      const randomDirection =
        pathWays[Math.floor(Math.random() * pathWays.length)];
      switch (randomDirection) {
        case "right":
          ghost.nextDx = ghost.speed;
          ghost.nextDy = 0;
          break;
        case "left":
          ghost.nextDx = -ghost.speed;
          ghost.nextDy = 0;
          break;
        case "up":
          ghost.nextDy = -ghost.speed;
          ghost.nextDx = 0;
          break;
        case "down":
          ghost.nextDy = ghost.speed;
          ghost.nextDx = 0;
          break;
      }
      ghost.previousCollisions = [];
    }
  });
  if (!gameOver) animationId = requestAnimationFrame(mainAnimation);
}

mainAnimation();

function keyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      p1.nextDy = -p1.speed;
      p1.nextDx = 0;
      break;
    case "ArrowDown":
      p1.nextDy = p1.speed;
      p1.nextDx = 0;
      break;
    case "ArrowLeft":
      p1.nextDx = -p1.speed;
      p1.nextDy = 0;
      break;
    case "ArrowRight":
      p1.nextDx = p1.speed;
      p1.nextDy = 0;
      break;
  }
}

window.addEventListener("keydown", keyDown);
