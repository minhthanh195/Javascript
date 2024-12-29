//CONSTANT //
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
  'red',
  'orange',
  'green',
  'purple',
  'blue',
  'cyan',
  'yellow',
  'white',
];

const WHITE_COLOR_ID = 7;

const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const KEY_CODES = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
};

const canvas = document.getElementById('board');
const ctx  = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
  constructor (ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    // this.isPlaying = false;
  }

  generateWhiteBoard() {
    return Array.from({length: ROWS}, () => Array(COLS).fill(WHITE_COLOR_ID))
  }

  drawCell(xAsis,yAsis, colorId) {
    this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    this.ctx.fillRect(xAsis * BLOCK_SIZE, yAsis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(xAsis * BLOCK_SIZE, yAsis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }

  drawBoard() {
    for(let col = 0; col < this.grid[0].length; col++) {
      for(let row = 0; row < this.grid.length; row++){
        this.drawCell(col, row, this.grid[row][col])
      }
    }
  }

  handleCompleteRows() {
    const latestGrid = board.grid.filter((row) => {
      return row.some((col) => col === WHITE_COLOR_ID)
    })

    const newScore = ROWS - latestGrid.length;
    const newRows = Array.from({length: newScore}, () => Array(COLS).fill(WHITE_COLOR_ID))
    
    if (newScore) {
      board.grid = [...newRows,...latestGrid];
      this.handleScore(newScore * 10)
    }
  }
  
  handleScore(newScore) {
    this.score += newScore;
    document.getElementById('score').innerHTML = this.score
  }

  handleGameOver() {
    this.gameOver = true;
    alert('Game Over!!!')
  }

  resetBoard() {
    this.score = 0;
    this.gameOver = false;
    this.grid = this.generateWhiteBoard();
    this.handleScore(0)
    // this.isPlaying = false;
    this.drawBoard()
    generateNewBrick()
  }
}

document.getElementById('play-btn').addEventListener('click', () => {
  board.resetBoard()
  const refresh = setInterval(() => {
    if(!board.gameOver) {
      brick.moveDown()
    } else {
      clearInterval(refresh)
    }
  },1000)
})

class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.colPos = 3;
    this.rowPos = -3;
  }

  draw() {
    for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
      for(let row = 0; row < this.layout[this.activeIndex].length; row++) {
        if(this.layout[this.activeIndex][row][col] != WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id)
        }
      }
    }
  }

  clear() {
    for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
      for(let row = 0; row < this.layout[this.activeIndex].length; row++) {
        if(this.layout[this.activeIndex][row][col] != WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID)
        }
      }
    }
  }
  
  moveLeft() {
    if(!this.checkCollision(this.rowPos,this.colPos - 1,this.layout[this.activeIndex])) {
      this.clear()
      this.colPos--;
      this.draw();
    }
  }

  moveRight() {
    if(!this.checkCollision(this.rowPos,this.colPos + 1,this.layout[this.activeIndex])) {
      this.clear()
      this.colPos++;
      this.draw();
    }
  }

  moveDown() {
    if(!this.checkCollision(this.rowPos + 1,this.colPos,this.layout[this.activeIndex])) {
      this.clear()
      this.rowPos++;
      this.draw();
      return
    }
    this.handleLanded();
    generateNewBrick();
  }

  rotate() {
    if(!this.checkCollision(this.rowPos,this.colPos,this.layout[(this.activeIndex + 1) % 4])) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }
// Notice about parameter nextLayout only use in METHOD : rotate, METHOD : moveDown,moveLeft,moveRight don't need use parameter nextLayout (code synchronization )
  checkCollision(nextRow, nextCol, nextLayout) {
    for(let col = 0; col < nextLayout[0].length; col++){
      for(let row = 0; row < nextLayout.length; row++) {
        if(nextLayout[row][col] != WHITE_COLOR_ID && nextRow >= 0) { 
          if((col + nextCol >= COLS) || (row + nextRow >= ROWS) || (col + nextCol < 0) || (board.grid[row + nextRow][col + nextCol] != WHITE_COLOR_ID )) return true;
        }
      }
    }
  }

  handleLanded() {
    if(this.rowPos <= 0) {
      board.handleGameOver();
      return
    }

    for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
      for(let row = 0; row < this.layout[this.activeIndex].length; row++) {
        if(this.layout[this.activeIndex][row][col] != WHITE_COLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id
        }
      }
    }
    board.handleCompleteRows();
    board.drawBoard()
  }
}

function generateNewBrick() {
  brick = new Brick(Math.floor(Math.random()*10) % BRICK_LAYOUT.length);
}



board = new Board(ctx);
board.drawBoard();
generateNewBrick()
brick.draw();
brick.rotate();

document.addEventListener('keydown',(e) => {
  if(!board.gameOver) {
    switch(e.code) {
      case KEY_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODES.DOWN:
        brick.moveDown();
        break;
      case KEY_CODES.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
})
