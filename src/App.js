import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board : Array(10).fill(Array(10).fill(0)),
      hasPiece: false
    }
    this.movePieceDown = this.movePieceDown.bind(this);
    this.movePieceLeft = this.movePieceLeft.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.freezePieces = this.freezePieces.bind(this);
    setInterval(() => {
      if (!this.state.hasPiece) {
        this.generatePiece('tall')
      }
      this.movePieceDown()
    }, 1000)
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(e) {
    // console.log(e.key);
    if (e.key === "ArrowLeft") {
      this.movePieceLeft();
    }
    // if (e.key === "ArrowRight") {
    // }
  }

  generatePiece(type) {
    if (!this.isValid(type)) {
      console.log('we lose')
      return
    }
    let boardCopy = this.state.board.map(arr => arr.slice())
    if (type === 'tall') {
      for (let i = 0; i < 4; i++) {
        boardCopy[i][4] = 2
      }
    }
    this.setState({
      board : boardCopy,
      hasPiece : true
    })
  }

  isValid(type) {
    if (type === 'tall') {
      for (let i = 0; i < 4; i++) {
        if (this.state.board[i][4]) {
          return false
        }
      }
    }
    return true
  }

  generateBoardString(board) {
    let result = '';
    for (let i = 0; i < board.length; i++) {
      result += board[i].join('') + ' ';
    }
    return result;
  }

  freezePieces(boardCopy) {
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        if (boardCopy[i][j] === 2) {
          boardCopy[i][j] = 1;
        }
      }
    }
    this.setState({
      hasPiece : false,
    })
  }

  movePieceLeft() {
    let possible = true;
    let boardCopy = this.state.board.map(arr => arr.slice())
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        if (boardCopy[i][j] === 2 && (!boardCopy[i][j - 1] || boardCopy[i][j - 1] === 1)) {
          possible = false;
        }
      }
      if (possible) {
        for (let i = 0; i < boardCopy.length; i++) {
          for (let j = 0; j < boardCopy[i].length; j++) {
            if (boardCopy[i][j] === 2) {
              boardCopy[i][j - 1] = 2;
              boardCopy[i][j] = 0;
            }
          }
        }
      }
    }
    this.setState({
      board : boardCopy,
    })
  }

  movePieceDown() {
    let boardCopy = this.state.board.map(arr => arr.slice())
    for (let i = boardCopy.length - 1; i >=0; i--) {
      for (let j = 0; j < boardCopy[0].length; j++) {
        if (boardCopy[i][j] === 2) {
          if (i + 1 < boardCopy.length) {
            if (!boardCopy[i + 1][j]) {
              boardCopy[i + 1][j] = 2
              boardCopy[i][j] = 0
            } else {
              this.freezePieces(boardCopy)
              break
            }
          } else {
            this.freezePieces(boardCopy);
          }
        }
      }
    }
    this.setState({
      board: boardCopy
    })
  }

  render() {
    let tetrisBoard = this.generateBoardString(this.state.board);
    return (
      <div>
        {tetrisBoard}
      </div>
    )
  }
}

export default App;
