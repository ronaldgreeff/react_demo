import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // renders a single <button> element representing a square on the board

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
      //                            onClick={function() { alert('click');}
      // <button className="square" onClick={() => alert(this.props.state)}>

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
  renderSquare(i) {
    // pass prop from parent to child
    // "Passing props is how information flows in React apps,
    // from parents to children."
    return <Square value={i}/>;
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
