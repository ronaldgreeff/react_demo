import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// always call super when defining the constructor of a subclass
// All React component classes that have a constructor should start
// with a super(props) call
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }
//
// "Passing props is how information flows in React apps,
// from parents to children."
//
// !To collect data from multiple children, or to have two child components
// communicate with each other, you need to declare the shared state in
// their parent component instead. The parent component can pass the state
// back down to the children by using props; this keeps the child
// components in sync with each other and with the parent component.
//
// Convention: on[Event] for props/ events and handle[Event] for methods
// unmutable data allows history to be stored by not modifying the original data, instead produce a new copy

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}


class Game extends React.Component {
  /* Constructor
    ^history: [squares: {squares: [null,...]}],
    ^xIsNext: true */
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }
  /* handleClick - method for interacting with constructor's data
    history, copy squares, get current squares, calculateWinner, xIsnext */
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // todo: check
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  /* render - use state and props + methods to get constants
    return xml-like structure with props and methods */
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];

    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status; // todo: check
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // you are here https://reactjs.org/tutorial/tutorial.html#picking-a-key

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
