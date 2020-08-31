import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // renders a single <button> element representing a square on the board

 // 1
  // lets store the current state of Square in this.state and change it
  // when Square is clicked. To do so, first we add a constructor, then
  //  we change the render method to display the current state
  constructor(props) {
    // always call super when defining the constructor of a subclass
    // All React component classes that have a constructor should start
    // with a super(props) call
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      // 0
      //                            onClick={function() { alert('click');}
      // <button className="square" onClick={() => alert(this.props.state)}>

      // 2
      // By calling this.setState from an onClick handler
      // in the Square’s render method, we tell React to
      // re-render that Square whenever its <button> is clicked.

      // When you call setState in a component, React
      // automatically updates the child components inside of it too.
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}>
          {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // renders 9x squares

  // 3
  // !To collect data from multiple children, or to have two child components
  // communicate with each other, you need to declare the shared state in
  // their parent component instead. The parent component can pass the state
  // back down to the children by using props; this keeps the child
  // components in sync with each other and with the parent component.
  // Lifting the state up:
  class Board extends React.Component {
    // Board’s initial state to contain an array of 9 nulls corresponding
    // to the 9 squares:
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null)
      }
    }
  }

  renderSquare(i) {
    // 0
    // pass prop from parent to child
    // "Passing props is how information flows in React apps,
    // from parents to children."
    // return <Square value={i}/>;

    // 3.1
    // using the state from the constructor above
    return <Square value={this.state.squares[i]} />
  }

  render() {
    const status = 'Next player: X';

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
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
