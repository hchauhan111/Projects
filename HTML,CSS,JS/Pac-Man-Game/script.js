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

const map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
];

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
