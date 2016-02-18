import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
  render() {
    return (
      <h1>Hello World! <span>testing</span></h1>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
