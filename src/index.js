import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
* Square
*
* Class-object that handles board squares and clicks on them
*
*
* @author       Stepan Makhorin
* @version      1.0
* @copyright    GNU Public License
*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


/**
 * Board
 * 
 * Class that handles nearly entire logic of the game
 * 
 * 
 * @author       Stepan Makhorin
 * @version      1.0
 * @copyright    GNU Public License
 */
class Board extends React.Component {

  /**
   * Class constructor
   * 
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      beginningState: Array(9).fill(null),
      xIsNext: true,
    }
  }

  /**
   * The click-handler
   * 
   * slices array into a new one to ensure that our main board is immutable
   * 
   * 
   * @param {The number of clicked square} i 
   */
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calcWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
  }

  /**
   * The square-renderer
   * 
   * Renders the square object and parses the click method onto it
   * 
   * 
   * @param {The number square to bee clicked} i 
   */
    renderSquare(i) {
      return (<Square 
      value={this.state.squares[i]}
      onClick={()=> this.handleClick(i)}
      />
      );
    }
  
    /**
     * Resetter
     * 
     * resets the entire game instead of reloading the page
     */
    reset() {
      this.setState({
          squares: this.state.beginningState,
          xIsNext: true,
      });
    }

    /**
     * Render
     * 
     * The main React method that gets executed
     */
    render() {
      const winner = calcWinner(this.state.squares);

      let status;
      if(winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <br/>
          <button onClick={() => this.reset()}>Go to Game Start</button>
        </div>
      );
    }
  }

/**
 * Game
 * 
 * Class that reders all html tags and puts classes into them
 * 
 * 
 * @author       Stepan Makhorin
 * @version      1.0
 * @copyright    GNU Public License
 */
class Game extends React.Component {
    render() {
      return (
        <div className="game">
        <div className="game-board">
            <Board />
        </div>
          <div className="game-info">
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  /**
   * ReactDOM method that handles the fake DOM it creates
   */
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  // ========================================

  /**
   * calcWinner
   * 
   * Goes through a preset line combinations to determine if the game is over
   * 
   * 
   * @param {Gameboard to parse} squares 
   */
  function calcWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 6],
      [0, 4, 8],
      [2, 4, 6],
      [2, 5, 8],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }
