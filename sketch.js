let board;
let sz = 10;
let rows = 80;
let cols = 80;
let atoms = [];
let cnv 

function setup() {
  cnv =createCanvas(1000, 1000);
  let cx = (windowWidth - cnv.width)/2
  let cy = (windowHeight - cnv.height)/2
  cnv.position(cx, cy)
  background(255, 255, 0);
  board = twoDarr(rows, cols, 0); //set up board
  placeAtoms(40); // set up atoms
  
  
   
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
        fill(255,0,0); // sand
      } else if (board[j][i] > 1) {
        fill(10, 140, 250); // water
      }  else {
        fill(0); // empty
      }

      rect(i * sz, j * sz, sz, sz); // whoops!! this is standard x, y
    }
  }
}


function placeAtoms(numofatoms){
  atoms = []  // clear the array
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