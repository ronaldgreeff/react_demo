import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Button } from '@material-ui/core';

// React efficiently update of state and props down a hierarchy of components
// Use constructor to define the state and props
//
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

// square is the lowest component in the hierarchy. It's props are provided by "Board"
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


// Board handles lay out of 9 squares and provides Square's props
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

/* Where Square defines a single square component and Board defines how squares
are layed out, Game manages what happens when you click and game history */
class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  /* handleClick - method for interacting with (setting) constructor's data
    history, copy squares, get current squares, calculateWinner, xIsnext */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // if we do time travel, this allows us throw away the current timeline's "future" from this point
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // if (this.state.xIsNext = true) return 'X' else return 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  /* render - use state and props + methods to get constants
    return xml-like structure with props and methods */
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // history of moves each as a <li>
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li key={move}>
          <Button onClick={() => this.jumpTo(move)}>{desc}</Button>
        </li>
      );
    });

    // determine winner
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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
// onClick Event Handling - cornerstone of React apps

// Call a Function After Clicking a Button
// function App() {
//
//   function sayHello() {
//     alert('Hello!');
//   }
//
//   return (
//     <button onClick={sayHello}>
//       Click me!
//     </button>
//   );
// }

// Call an Inline Function in an onClick Event Handler
// function App() {
//     function sayHello() {
//       alert('Hello!');
//     }
//   return (
//     <button onClick={() => sayHello()}>
//       Click me!
//     </button>
//   );
// }

// Call Multiple Functions in an onClick Event Handler
// <button onClick={() => {
//   this.sayHello();
//   this.setState({ name: "James"});
// }}>
//   Click me!
// </button>
//
// <button onClick={() => {
//   const name = 'James';
//   alert('Hello, ', name);
// }}>
//   Click me!
// </button>

// Updating the State in an onClick Event Handler
// class App extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };
//   }
//
//   render() {
//     return (
//       <button onClick={() => this.setState({ count: 1})}>
//         {this.state.count}
//       </button>
//     );
//   }
// }

// Pass a Button Value to an Inline Function
// function App() {
//   return (
//     <button value="hello!" onClick={e => alert(e.target.value)}>
//       Click me!
//     </button>
//   );
// }

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
