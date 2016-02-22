import React from 'react';
// import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getInput() {
    this.props.getQuery(this.refs.zip.value, this.refs.start.value, this.refs.end.value);
  }
  /*eslint-disable */


  render() {
    return (
      <div className="search">
        <div className="form-group">
          <label htmlFor="zip">Enter a Zipcode:</label>
          <input type="number" className="form-control" ref="zip"/>
        </div>
        <div className="form-group">
          <label htmlFor="start">Enter start date: (DDMMYYYY)</label>
          <input type="number" className="form-control" ref="start" />
            <label htmlFor="end">Enter end date: (DDMMYYYY, optional)</label>
          <input type="number" className="form-control" ref="end" />
          <button type="submit" className="btn btn-info submitbutton"
            onClick={this.getInput.bind(this)}>
              Start Search </button>
        </div>
      </div>
    );
  }
  /*eslint-enable */

}

export default Search;
