let board;
let sz = 10;
let rows = 80;
let cols = 80;
let atoms = [];
let cnv;
let lx, ly;
let guang = false;
let intheata = 90;
let laser;

function setup() {
  angleMode(DEGREES);
  cnv = createCanvas(1000, 1000);
  let cx = (windowWidth - cnv.width) / 2;
  let cy = (windowHeight - cnv.height) / 2;
  cnv.position(cx, cy);
  background(255, 255, 0);
  board = twoDarr(rows, cols, 0); //set up board
  placeAtoms(40); // set up atoms
  laser = createVector(0, 0);
}

function draw() {
  background(0);
  translate(100, 100);
  stroke(255, 255, 0);
  noStroke();
  showGrid();
  //laserTop();
  laserTurtle();
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
      } else if (board[j][i] > 1) {
        fill(0, 255, 255, 60); // lazer
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
      print(na, rx, ry);
    } else {
      print("bang");
    }
  }
  print(atoms);
}

// laser from top

function laserTop() {
  // starts with the y value =0 and ends in 5 cases
  // 1 if it starts next to an atom  reflected back
  // 2 if hits an atom directly : absorbed
  // 3 if the y value = rows -1  passes across
  // 4 if tye x value = 0 : reflected to the left
  // 5 if the x value = cols -1  reflected to the right

  // get random starting place
  if (!guang) {
    lx = floor(random(cols));
    ly = 0;
    guang = true;
    board[ly][lx] = 2;
  } else {
    if (ly < rows - 1) {
      ly = ly + 1;
      board[ly][lx] = 2;
    } else {
      guang = false;
      ly = 0;
    }
  }
}

function laserTurtle() {
  print(guang);
  if (!guang) {
    laser.x = floor(random(cols));
    laser.y = 0;
    guang = true;
    board[laser.y][laser.x] = 2;
  } else {
    if (laser.y < rows - 1) {
      if (board[laser.y + 1][laser.x + 1] == 1) right();
      forward();

      board[laser.y][laser.x] = 2;
      print(laser);
    } else {
      guang = false;
      laser.y = 0;
    }
  }
}

function forward() {
  let x2 = laser.x + 1 * cos(intheata);
  let y2 = laser.y + 1 * sin(intheata);

  // the math works out and divides evenly only need to recast as ints

  // set the x and y to new position

  laser.x = int(x2); // I was flooring it twice and made a problem
  laser.y = int(y2);
}

function right() {
  intheata -= 90;
  intheata = intheata % 360;
}

function left() {
  intheta += 90;
  intheta = intheta % 360;
}

/// if out of bounds like sand
/// if inter act with
//
