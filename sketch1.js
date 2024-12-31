let board;
let sz = 10;
let rows = 80;
let cols = 80;
let atoms = [];
let cnv;
let lx, ly;
let guang = false;
let intheta = 90;
let laser;
let selectedLaser;

function setup() {
  angleMode(DEGREES);
  pixelDensity(1);
  cnv = createCanvas(1000, 1000);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  background(255, 255, 0);
  board = twoDarr(rows, cols, 0); //set up board
  placeAtoms(60); // set up atoms
  laser = createVector(0, 0);
  selectedLaser = random([laserTurtle, laserTurtleb]);
}

function draw() {
  background(0);
  translate(100, 100);
  stroke(255, 255, 0);
  noStroke();
  showGrid();
  //laserTop();
  selectedLaser();
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
        fill(255, 0, 0); // atom
      } else if (board[j][i] == 2) {
        fill(0, 255, 255); // lazer
      } else if (board[j][i] == 3) {
        fill(255, 255, 0); // lazer
      } else {
        fill(0); // empty
      }

      rect(i * sz, j * sz, sz - 2, sz - 2); // whoops!! this is standard x, y
    }
  }
}

function placeAtoms(numofatoms) {
  atoms = []; // clear the array
  while (atoms.length < numofatoms) {
    let rx = floor(random(cols));
    let ry = floor(random(rows));
    let na = str(rx) + str(ry);
    if (!atoms.includes(na)) {
      board[ry][rx] = 1; // one is the attom
      atoms.push(na);
      //print(na, rx, ry);
    } else {
      print("bang");
    }
  }
  //print(atoms);
}
function laserTurtle() {
  if (!guang) {
    laser.x = floor(random(cols));
    laser.y = 1;
    guang = true;
    intheta = 90;
    board[laser.y][laser.x] = 2;
  } else {
    if (inBounds(laser.x, laser.y)) {
      const { forwardCell, leftCell, rightCell } = detectCollision();

      if (forwardCell == 1) {
        resetlaser(); // Absorbed
      } else if (leftCell == 1) {
        right(); // Turn right
      } else if (rightCell == 1) {
        left(); // Turn left
      }

      forward();
      board[laser.y][laser.x] = 2;
    } else {
      resetlaser();
    }
  }
}

function laserTurtleb() {
  if (!guang) {
    laser.x = floor(random(cols));
    laser.y = rows - 2;
    guang = true;
    intheta = 270;
    board[laser.y][laser.x] = 3;
  } else {
    if (inBounds(laser.x, laser.y)) {
      const { forwardCell, leftCell, rightCell } = detectCollision();

      if (forwardCell == 1) {
        resetlaser(); // Absorbed
      } else if (leftCell == 1) {
        right(); // Turn right
      } else if (rightCell == 1) {
        left(); // Turn left
      }

      forward();
      board[laser.y][laser.x] = 3;
    } else {
      resetlaser();
    }
  }
}

function resetlaser() {
  guang = false;
  //laser.y = 1;
  //intheta = 90;
  selectedLaser = random([laserTurtle, laserTurtleb]);
}

function forward() {
  let x2 = laser.x + 1 * cos(intheta);
  let y2 = laser.y + 1 * sin(intheta);

  // the math works out and divides evenly only need to recast as ints

  // set the x and y to new position

  laser.x = int(x2); // I was flooring it twice and made a problem
  laser.y = int(y2);
}

function right() {
  intheta -= 90;
  intheta = intheta % 360;
}

function left() {
  intheta += 90;
  intheta = intheta % 360;
}

/// if out of bounds like sand
/// if inter act with
//

function inBounds(x, y) {
  return x >= 1 && y >= 1 && x < cols - 1 && y < rows - 1; // rows not height
}

function detectCollision() {
  let leftCell, rightCell, forwardCell;

  if (intheta == 90) {
    // Facing down
    forwardCell = board[laser.y + 1][laser.x];
    leftCell = board[laser.y + 1][laser.x - 1];
    rightCell = board[laser.y + 1][laser.x + 1];
  } else if (intheta == 180) {
    // Facing left
    forwardCell = board[laser.y][laser.x - 1];
    leftCell = board[laser.y - 1][laser.x - 1];
    rightCell = board[laser.y + 1][laser.x - 1];
  } else if (intheta == 270) {
    // Facing up
    forwardCell = board[laser.y - 1][laser.x];
    leftCell = board[laser.y - 1][laser.x - 1];
    rightCell = board[laser.y - 1][laser.x + 1];
  } else if (intheta == 0) {
    // Facing right
    forwardCell = board[laser.y][laser.x + 1];
    leftCell = board[laser.y - 1][laser.x + 1];
    rightCell = board[laser.y + 1][laser.x + 1];
  }

  return { forwardCell, leftCell, rightCell };
}
