let board;
let sz = 10;
let rows = 80;
let cols = 80;
let atoms = [];

function setup() {
  createCanvas(1000, 1000);
  background(255, 255, 0);
  board = twoDarr(rows, cols, 0);

  while (atoms.length < 40) {
    let rx = floor(random(cols));
    let ry = floor(random(rows));
    let na = str(rx) + str(ry);
    if (!atoms.includes(na)) {
      board[ry][rx] = 3;
      atoms.push(na);
      print(na, rx, ry);
    } else {
      print("bang");
    }
  }
  print(atoms);
}

function draw() {
  background(255, 255, 0);
  translate(100, 100);
  stroke(255, 255, 0);
  noStroke();
  showGrid();

  noLoop();
}

function twoDarr(rows, cols, data) {
  // function returns an array  rows by columns
  let myarr = [];
  for (let j = 0; j < rows; j++) {
    myarr[j] = [];
    for (let i = 0; i < cols; i++) {
      myarr[j][i] = data;
    }
  }
  return myarr;
}

function showGrid() {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      // set color
      if (board[j][i] == 1) {
        fill(255, 150, 50); // sand
      } else if (board[j][i] == 2) {
        fill(10, 140, 250); // water
      } else if (board[j][i] == 3) {
        //fill(170, 163, 163); // rock
        fill(255, 0, 0);
      } else {
        fill(0); // empty
      }

      rect(i * sz, j * sz, sz, sz); // whoops!! this is standard x, y
    }
  }
}
